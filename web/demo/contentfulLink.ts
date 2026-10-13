// Apollo link for coaching content. It asks the real Contentful test space
// first (works when running `yarn web` locally) and falls back to the sample
// program in ./coachingContent when Contentful can't be reached, e.g. inside
// a sandboxed page that blocks outside requests.
import { ApolloLink, HttpLink, Observable } from '@apollo/client'
import { CONFIG } from '@config/config'
import { resolveDemoQuery } from './coachingContent'

const live = new HttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${CONFIG.CONTENTFUL_SPACE}`,
  headers: {
    authorization: `Bearer ${CONFIG.CONTENTFUL_SPACE_ACCESS_TOKEN}`,
    'Content-Language': 'en-us'
  }
})

let useBundled = false

const bundled = new ApolloLink(
  (operation) =>
    new Observable((observer) => {
      observer.next({
        data: resolveDemoQuery(operation)
      })
      observer.complete()
    })
)

export const contentfulLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      if (useBundled) {
        return bundled.request(operation, forward)?.subscribe(observer)
      }

      let fellBack = false
      const fallBack = () => {
        if (fellBack) return
        fellBack = true
        useBundled = true
        bundled.request(operation, forward)?.subscribe(observer)
      }

      const subscription = live.request(operation, forward)?.subscribe({
        next: (result) => {
          const empty =
            !result.data ||
            Object.values(result.data).every(
              (collection) =>
                !collection ||
                (collection as { items?: [] }).items?.length === 0
            )
          if (result.errors?.length || empty) {
            fallBack()
          } else {
            observer.next(result)
          }
        },
        error: fallBack,
        complete: () => {
          if (!fellBack) observer.complete()
        }
      })

      return () => subscription?.unsubscribe()
    })
)

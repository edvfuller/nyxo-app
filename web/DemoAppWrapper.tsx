// Web counterpart of src/AppWrapper.tsx. Same providers, but:
//  - coaching content comes from bundled sample content when Contentful
//    can't be reached (see ./demo/contentfulLink)
//  - the store is topped up with a rolling month of sample sleep
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { addNights } from '@reducers/nights'
import { setSource } from '@reducers/source'
import { persistor, store } from '@store/store'
import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from '../src/App'
import { contentfulLink } from './demo/contentfulLink'
import { DEMO_SOURCE, generateDemoNights } from './demo/sleep'

const client = new ApolloClient({
  link: contentfulLink,
  cache: new InMemoryCache()
})

const seedDemoData = () => {
  const { source } = store.getState()
  if (!source.source) {
    store.dispatch(setSource(DEMO_SOURCE))
  }
  store.dispatch(addNights(generateDemoNights()))
}

export const DemoAppWrapper: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={seedDemoData}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

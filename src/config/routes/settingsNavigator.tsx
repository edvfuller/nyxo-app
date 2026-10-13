import CloudSettings from '@screens/settings/CloudSettings'
import CoachingSettings from '@screens/settings/CoachingSettings'
import GarminScreen from '@screens/settings/GarminScreen'
import ManageSubscription from '@screens/settings/ManageSubscription'
import Settings from '@screens/settings/settings'
import SetSource from '@screens/settings/SourceSettings'
import { ThemeScreen } from '@screens/settings/Theme'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import ROUTE from './Routes'

const Stack = createNativeStackNavigator<
  RootStackParamList['App']['Settings']
>()

const SettingsNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE.SETTINGS}
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sources"
        component={SetSource}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cloud"
        component={CloudSettings}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Coaching"
        component={CoachingSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subscription"
        component={ManageSubscription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.GARMIN}
        component={GarminScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default SettingsNavigator

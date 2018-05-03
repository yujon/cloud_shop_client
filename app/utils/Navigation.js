import { NavigationActions } from 'react-navigation';

export const reset = (navigation, routeName) => {
   const resetAction = NavigationActions.reset({
        index: 0,
        key:null,
        actions: [NavigationActions.navigate({ routeName })]
   });
   navigation.dispatch(resetAction);
};

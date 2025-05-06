
  import {  NavigationIndependentTree } from '@react-navigation/native';
  import PagesNav from './navigation/PagesNav'
  const App = () => {
    
    return (
      
        <NavigationIndependentTree>
          <PagesNav/>
        </NavigationIndependentTree>
      
    );
  };

  export default App;

import { QPOSContextProvider } from "./context/QPOSContext";
import MainScreen from "./Screens/main";

export default function App() {
  return (
    <QPOSContextProvider>
      <MainScreen />
    </QPOSContextProvider>
  );
}

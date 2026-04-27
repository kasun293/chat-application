// import "./App.css";
import SnackBars from "./components/SnackBar/SnackBars";
import { UserProvider } from "./context/auth/userProvider";
import { SnackBarProvider } from "./context/snackbars/snackBarProvider";
import WebSocketProvider from "./context/webSocket/webSocketProvider";
import AuthProvider from "./hooks/AuthProvider";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <SnackBarProvider>
        <UserProvider>
          <WebSocketProvider>
            <AppRoutes />
            <SnackBars />
          </WebSocketProvider>
        </UserProvider>
      </SnackBarProvider>
    </AuthProvider>
  );
}

export default App;

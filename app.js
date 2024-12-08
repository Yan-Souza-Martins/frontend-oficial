import React from "react";
import { AuthProvider } from "./authContext"; // Atualize o caminho


export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

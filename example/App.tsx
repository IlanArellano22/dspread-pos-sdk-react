import React from "react";
import Navigation from "./navigation";
import modalManager from "./components/Manager/modalManager";

export default function App() {
  return (
    <>
      <Navigation />
      <modalManager.Component />
    </>
  );
}

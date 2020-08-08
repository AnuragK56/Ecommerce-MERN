import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Section from "./components/Section";
import { DataProvider } from "./components/Context";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <DataProvider>
        <div className="app">
          <Router>
            <Header></Header>
            <Section />
            <Footer></Footer>
          </Router>
        </div>
      </DataProvider>
    );
  }
}

export default App;

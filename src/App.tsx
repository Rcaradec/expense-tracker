import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <>
      <h1 className="text-primary mb-5">Gestionnaire de dépenses</h1>
      <Form />
    </>
  );
}

export default App;

// J'ai besoin de:
// - un composant Form
// - un composant Select Categories
// - un composant List avec un Select de filtre

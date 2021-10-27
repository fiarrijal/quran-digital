import React from "react";
import { Route } from "react-router";
import "./App.css";
import DetailSurat from "./components/DetailSurat";
import ListSurat from "./components/ListSurat";
import SelectedAyat from "./components/SelectedAyat";

export default function App() {
	return (
		<div>
			<Route path="/" exact component={ListSurat} />
			<Route path="/surat/:id" exact component={DetailSurat} />
			<Route path="/surat/:slug/:id" exact component={SelectedAyat} />
		</div>
	);
}

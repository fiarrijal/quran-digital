import React from "react";
import { Route } from "react-router";
import "./App.css";
import DetailSurat from "./components/DetailSurat";
import ListSurat from "./components/ListSurat";

export default function App() {
	return (
		<div>
			<Route path="/" exact component={ListSurat} />
			<Route path="/surat/:id" exact component={DetailSurat} />
		</div>
	);
}

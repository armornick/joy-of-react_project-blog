"use client";
import React from "react";
import { Sun, Moon } from "react-feather";
import Cookies from "js-cookie";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";
import VisuallyHidden from "@/components/VisuallyHidden";

function ColorModeSwitcher({ initialTheme, ...delegated }) {
	const [darkMode, setDarkMode] = React.useState(initialTheme !== "light");

	function handleClick() {
		setDarkMode(!darkMode);
		const nextTheme = !darkMode ? "dark" : "light";

		// Write the cookie for future visits
		Cookies.set("color-theme", nextTheme, {
			expires: 1000,
		});

		const TOKENS = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

		const root = document.documentElement;

		root.setAttribute("data-color-theme", nextTheme);

		Object.entries(TOKENS).forEach(([Key, value]) => {
			root.style.setProperty(Key, value);
		});
	}

	return (
		<button onClick={handleClick} {...delegated}>
			{darkMode ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
			<VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
		</button>
	);
}

export default ColorModeSwitcher;

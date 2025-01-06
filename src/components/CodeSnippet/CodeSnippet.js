import React from "react";
import { Code } from "bright";

import theme from "./theme";
import styles from "./CodeSnippet.module.css";

function CodeSnippet(props) {
	const lang = props.className
		? props.className?.replace("language-", "")
		: undefined;
	return (
		<Code {...props} theme={theme} lang={lang} className={styles.wrapper} />
	);
}

export default CodeSnippet;

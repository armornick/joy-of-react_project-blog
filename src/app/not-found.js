import styles from "./homepage.module.css";

export default function NotFound() {
	return (
		<div className={styles.wrapper}>
			<h1>404 Not Found</h1>
			<p>This page does not exist. Please check the URL and try again.</p>
		</div>
	);
}

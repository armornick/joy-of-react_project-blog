"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { LayoutGroup, motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
	{ label: "red", value: "hsl(348deg 100% 60%)" },
	{ label: "yellow", value: "hsl(50deg 100% 55%)" },
	{ label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
	const [playing, setPlaying] = React.useState(false);
	const [timeElapsed, setTimeElapsed] = React.useState(0);
	const id = React.useId();

	React.useEffect(() => {
		function handleTick() {
			if (playing) {
				setTimeElapsed((current) => current + 1);
			}
		}

		const intervalId = setInterval(handleTick, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, [playing]);

	const selectedColor = COLORS[timeElapsed % COLORS.length];

	return (
		<Card as="section" className={styles.wrapper}>
			<LayoutGroup>
				<ul className={styles.colorsWrapper}>
					{COLORS.map((color, index) => {
						const isSelected = color.value === selectedColor.value;

						return (
							<li className={styles.color} key={index}>
								{isSelected && (
									<motion.div
										layoutId={`selected-color-outline-${id}`}
										className={styles.selectedColorOutline}
									/>
								)}
								<div
									className={clsx(
										styles.colorBox,
										isSelected && styles.selectedColorBox
									)}
									style={{
										backgroundColor: color.value,
									}}
								>
									<VisuallyHidden>
										{color.label}
									</VisuallyHidden>
								</div>
							</li>
						);
					})}
				</ul>
			</LayoutGroup>

			<div className={styles.timeWrapper}>
				<dl className={styles.timeDisplay}>
					<dt>Time Elapsed</dt>
					<dd>{timeElapsed}</dd>
				</dl>
				<div className={styles.actions}>
					<button onClick={() => setPlaying(!playing)}>
						{playing ? (
							<>
								<Pause />
								<VisuallyHidden>Pause</VisuallyHidden>
							</>
						) : (
							<>
								<Play />
								<VisuallyHidden>Play</VisuallyHidden>
							</>
						)}
					</button>
					<button onClick={() => setTimeElapsed(0)}>
						<RotateCcw />
						<VisuallyHidden>Reset</VisuallyHidden>
					</button>
				</div>
			</div>
		</Card>
	);
}

export default CircularColorsDemo;

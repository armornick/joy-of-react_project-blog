import dynamic from "next/dynamic";
import CodeSnippet from "@/components/CodeSnippet";

export const COMPONENT_MAP = {
	pre: CodeSnippet,
	DivisionGroupsDemo: dynamic(() =>
		import("@/components/DivisionGroupsDemo")
	),
	CircularColorsDemo: dynamic(() =>
		import("@/components/CircularColorsDemo")
	),
};

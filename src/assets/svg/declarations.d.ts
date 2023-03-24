declare module '*.svg' {
	import { SvgProps } from 'react-native-svg';
	const declarations: React.FC<SvgProps>;
	export default declarations;
}

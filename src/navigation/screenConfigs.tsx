import React from 'react';
import DefaultActionBar from 'src/common/DefaultActionBar';
export type ScreenOptions = {
	header?: () => React.ReactNode;
	headerShown?: boolean;
};

export type ScreenProps = Record<
	string,
	{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component: React.FC<any>;
		options: ScreenOptions;
	}
>;

export const NoHeader: ScreenOptions = { header: (): React.ReactNode => null };

export const TitleHeader = (
	title: string,
	{
		rightIcon,
		onPressRight,
		rightText,
		onPressLeft,
	}: {
		rightIcon?: 'search';
		rightText?: string;
		onPressRight?: () => void;
		onPressLeft?: () => void;
	} = {}
): ScreenOptions => {
	return {
		header: () => (
			<DefaultActionBar
				title={title}
				rightIconType={rightIcon}
				rightText={rightText}
				onPressRight={onPressRight}
				onPressLeft={onPressLeft}
			/>
		),
	};
};

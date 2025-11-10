// Vendored from there https://github.com/mhnpd/react-loader-spinner/blob/d387324e940c5b7fba2d6b77457099d77f1fa5e7/src/loader/oval.tsx
// MIT License Copyright (c) 2018 Mohan Pd.

const getPath = (radius: number): string => {
    return ['M' + radius + ' 0c0-9.94-8.06', radius, radius, radius].join('-');
};

const getViewBoxSize = (
    strokeWidth: number,
    secondaryStrokeWidth: number,
    radius: number,
): string => {
    const maxStrokeWidth = Math.max(strokeWidth, secondaryStrokeWidth);
    const startingPoint = -radius - maxStrokeWidth / 2 + 1;
    const endpoint = radius * 2 + maxStrokeWidth;

    return [startingPoint, startingPoint, endpoint, endpoint].join(' ');
};

const RADIUS = 20;

export const Oval = ({
    height = 80,
    width = 80,
    color,
    secondaryColor,
    strokeWidth = 2,
    strokeWidthSecondary,
}: {
    height?: number;
    width?: number;
    color?: string;
    secondaryColor: string;
    strokeWidth?: number;
    strokeWidthSecondary?: number;
}) => (
    <svg
        aria-busy="true"
        role="progressbar"
        width={width}
        height={height}
        viewBox={getViewBoxSize(
            Number(strokeWidth),
            Number(strokeWidthSecondary || strokeWidth),
            RADIUS,
        )}
        xmlns="http://www.w3.org/2000/svg"
        stroke={color}
        style={{ display: 'block' }}
    >
        <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth={Number(strokeWidthSecondary || strokeWidth)}>
                <circle
                    strokeOpacity=".5"
                    cx="0"
                    cy="0"
                    r={RADIUS}
                    stroke={secondaryColor}
                    strokeWidth={strokeWidth}
                />
                <path d={getPath(RADIUS)}>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 0 0"
                        to="360 0 0"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>
        </g>
    </svg>
);

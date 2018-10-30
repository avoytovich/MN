import * as React from 'react';

interface FlashIconProps {
    width?: number,
    height?: number,
    src: string,
    color: string,
    activeColor: string
}

const FlashIcon = (props:FlashIconProps) => (
    <img
    width={props.width}
    height={props.height}
    style={{
        mask: ``
    }}
    src={props.src} />
)
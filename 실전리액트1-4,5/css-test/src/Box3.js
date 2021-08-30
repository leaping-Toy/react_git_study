import React from "react";
import style from './Box3.module.scss';
import cn from 'classnames';

function Box({ size }) {
    const isBig = size === 'big';
    const label = isBig ? '큰박스' : '작은박스';
    return (
        <div
            className={cn(style.box, { [style.big]: isBig, [style.small]: !isBig })}
        >
            {label}
        </div>
    );
}

export default Box;

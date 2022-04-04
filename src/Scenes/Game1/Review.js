import React, { useEffect, useContext, useRef, useState } from 'react';
import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';

import { UserContext } from '../../components/BaseShot';
import { prePathUrl, generateStandardNum } from "../../components/CommonFunctions"

let timerList = []
//-0.5,1.25,5,-5


export default function Review1({ _baseGeo, nextFunc }) {
    const audioList = useContext(UserContext)
    const starList = Array.from({ length: 50 }, ref => useRef())
    const baseRef = useRef()

    useEffect(
        () => {

            audioList.bodyAudio.src = "./sounds/nowsay.mp3"


            setTimeout(() => {
                audioList.bodyAudio.play();
                setTimeout(() => {
                    starList.map((star, index) => {
                        setTimeout(() => {
                            star.current.style.transition = '0.5s'
                            star.current.style.transform = 'scale(1.25)'
                            if (index == 49)
                                setTimeout(() => {
                                    nextFunc()
                                }, 2500);
                        }, 1000 * index);
                    });
                }, audioList.bodyAudio.duration * 1000 + 500)
            }, 2000);
            return () => {
            }
        }, []
    )

    return (
        <div ref={baseRef}
            className="aniObject"  >
            <div
                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.0 + "px",
                    bottom: _baseGeo.bottom + _baseGeo.height * 0.0 + "px",
                }}>
                <BaseImage
                    url={'animations/SB54_summery_screen_02.svg'}
                />

                {
                    Array.from(Array(50).keys()).map(value =>
                        <div
                            key={value}
                            ref={starList[value]}
                            style={{
                                position: 'absolute',
                                width: '6%',
                                height: '11%',
                                left: (0.13 + (value % 10) * 0.075) * 100 + '%',
                                top: (0.1 + 0.17 * parseInt((value / 10))) * 100 + '%',
                            }}>

                            < BaseImage
                                url={'SB54_Prop-Interactive/PI_big_Star_01.svg'}
                            />
                            < BaseImage
                                scale={value == 49 ? 0.53 : 0.55}
                                posInfo={{
                                    l: 0.21
                                    , t: value > 4 ? 0.29 : 0.22
                                }}
                                url={'SB54_Text-Interactive/TI_G2_' + generateStandardNum((value + 1) * 2) + '_1.svg'}
                            />
                        </div>
                    )
                }


            </div>
        </div>
    );

}

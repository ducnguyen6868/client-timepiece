import { useEffect, useState } from 'react';
import '../../styles/LoadingAnimations.css';

export default function LoadingAnimations({ option }) {
    const [chooseLoader, setChooseLoader] = useState({
        spinner: false,
        dots: false,
        bars: false,
        circle: false,
        skeleton: false,
        hourglass: false,
        gradient: false,
    });
    useEffect(() => {
        setChooseLoader((prev) => ({
            [prev]: false,
            [option]: true
        }))
    }, [option]);
    return (
        <>     {/* Spinner Loader */}
            {chooseLoader.spinner && (
                <div className="loader-container">
                    <div className="spinner-loader"></div>
                    <p className="loader-text">Loading...</p>
                </div>
            )}

            {/* Pulse Loader */}
            {chooseLoader.pulse && (
                <div className="loader-container">
                    <div className="pulse-loader">
                        <div className="pulse-ring"></div>
                        <div className="pulse-ring"></div>
                        <div className="pulse-ring"></div>
                    </div>
                    <p className="loader-text">Loading content</p>
                </div>
            )}

            {/* Circle Loader */}
            {chooseLoader.circle && (
                <div className="loader-container">
                    <div className="circle-loader">
                        <div className="circle-path"></div>

                    </div>
                    <p className="loader-text">Sending OTP...</p>
                </div>
            )}

            {/* Skeleton Loader */}
            {chooseLoader.skeleton && (
                <div className="loader-container full-width">
                    <div className="skeleton-loader">
                        <div className="skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line title"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>
                        <div className="skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line title"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>
                        <div className="skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line title"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>
                        <div className="skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line title"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>
                        <div className="skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line title"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>
                        <div className="skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line title"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hourglass Loader */}
            {chooseLoader.hourglass && (
                <div className="loader-container">
                    <div className="hourglass-loader">
                        <div className="hourglass">
                            <div className="hourglass-top"></div>
                            <div className="hourglass-bottom"></div>
                        </div>
                    </div>
                    <p className="loader-text">Please be patient</p>
                </div>
            )}

            {/* Gradient Loader */}
            {chooseLoader.gradient && (
                <div className="loader-container">
                    <div className="gradient-loader">
                        <div className="gradient-spinner"></div>
                    </div>
                    <p className="loader-text">Preparing your content</p>
                </div>
            )}
            {/* Bars Loader */}
            {chooseLoader.bars && (
                <div className="loader-container">
                    <div className="bars-loader">
                        <div className="bar-item"></div>
                        <div className="bar-item"></div>
                        <div className="bar-item"></div>
                        <div className="bar-item"></div>
                        <div className="bar-item"></div>
                    </div>
                    <p className="loader-text">Checking payment...</p>
                </div>
            )}
            {/* Dots Loader */}
            {chooseLoader.dots && (
                <div className="loader-container">
                    <div className="dots-loader">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            )}
        </>
    );
}
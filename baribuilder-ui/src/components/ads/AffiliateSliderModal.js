import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import LaunchIcon from "@material-ui/icons/Launch";
import { fireEvent } from "../../analytics/googleAnalytics";
import ShowCTAContext from "../common/ShowCTAContext";

const ContainerDiv = styled.div`
	&& {
		z-index: 10;
		background-color: var(--color-vitag-blue-translucent);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

		border-radius: 8px;
		position: fixed;

		animation-duration: 2s;
		animation-name: slidein-desktop;

		display: flex;
		flex-direction: column;

		@media (max-width: 400px) {
			left: 16px;
			right: 16px;
			height: 75vh;
			top: 12.5vh;

			animation-name: slidein-mobile;
		}

		left: 25vw;
		right: 25vw;
		height: 50vh;
		top: 25vh;

		@keyframes slidein-desktop {
			from {
				top: -25vh;
			}

			to {
				top: 25vh;
			}
		}

		@keyframes slidein-mobile {
			from {
				top: -75vh;
			}

			to {
				top: 12.5vh;
			}
		}
	}
`;

const ClearButtonContainerDiv = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const ClearButton = styled(IconButton)`
	&& {
		color: rgba(0, 0, 0, 0.2);
		padding: 8px;
		display: flex;
		justify-content: center;
	}
`;

const AdContentDiv = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	height: 100%;

	> * {
		margin-left: 4px;
		margin-right: 4px;
		margin-bottom: 16px;
	}
`;

const ImageContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 32px;
`;

const CTAContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 48px;
`;

const CTAButton = styled.button`
	&& {
		padding: 8px;
		background-color: var(--color-bg);
		border-radius: 4px;
		text-transform: uppercase;
		line-height: normal;
		color: var(--color-base);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	}
`;

const AdImg = styled.img`
	max-height: 25vh;
	min-width: 40%;
`;

const CopyP = styled.p`
	text-align: center;
`;

const AdSpan = styled.span`
	color: var(--color-base);
	&:hover {
		cursor: pointer;

		// Remove the underline on hover
		text-decoration: none;
	}
`;

const AffiliateSliderModal = (props) => {
	const [wasCleared, setWasCleared] = useState(false);
	const [reachedScrollPercentage, setReachedScrollPercentage] = useState(false);
	const { id, link, copy, imgSrc, cta, percentage } = props.ad;
	const { slug, showingCTA } = props;

	useEffect(() => {
		if (
			!wasCleared &&
			!reachedScrollPercentage &&
			props.scrollPercentage >
				(percentage === undefined ? 50 : percentage) / 100
		) {
			setReachedScrollPercentage((prev) => {
				// Make sure we only fire the show affiliate ad event once
				if (!prev) {
					fireEvent({
						category: "Affiliate Ad Modal",
						action: "Show",
						label: `${slug}: ${id}`,
					});
					// JavaScript trigger for HotJar to start recording
					hj && hj("trigger", "show_affiliate_ad_modal");
				}
				return true;
			});
		}
	}, [props.scrollPercentage, wasCleared]);

	if (wasCleared || !reachedScrollPercentage) {
		return null;
	}

	const handleAdClick = () => {
		fireEvent({
			category: "Affiliate Ad Modal",
			action: "Click",
			label: `${slug}: ${id}`,
		});
		hj && hj("tagRecording", ["clicked_affiliate_ad_modal"]);
		window.open(link, "_blank");
	};

	return (
		<ContainerDiv showingCTA={showingCTA}>
			<ClearButtonContainerDiv>
				<ClearButton
					onClick={() => setWasCleared((prev) => !prev)}
					disableRipple
					disableFocusRipple
				>
					<ClearIcon />
				</ClearButton>
			</ClearButtonContainerDiv>
			<AdContentDiv>
				{imgSrc ? (
					<AdSpan
						onClick={handleAdClick}
						onMouseOver={
							// JavaScript trigger for HotJar to start recording
							() => {
								hj && hj("trigger", "hovered_affiliate_ad_modal");
								// console.error("hotjar triggered");
							}
						}
					>
						<ImageContentContainer>
							<AdImg src={imgSrc} />
						</ImageContentContainer>
					</AdSpan>
				) : null}
				<CopyP>
					<b>{copy}</b>
				</CopyP>
				<CTAContentContainer>
					<AdSpan
						onClick={handleAdClick}
						onMouseOver={
							// JavaScript trigger for HotJar to start recording
							() => {
								hj && hj("trigger", "hovered_affiliate_ad_modal");
								// console.error("hotjar triggered");
							}
						}
					>
						<CTAButton>
							{cta === undefined ? "Buy" : cta} <LaunchIcon />
						</CTAButton>
					</AdSpan>
				</CTAContentContainer>
			</AdContentDiv>
		</ContainerDiv>
	);
};

AffiliateSliderModal.propTypes = {
	ad: PropTypes.shape({
		id: PropTypes.string.isRequired,
		link: PropTypes.string.isRequired,
		copy: PropTypes.string.isRequired,
		cta: PropTypes.string,
		imgSrc: PropTypes.string,
		percentage: PropTypes.number,
	}).isRequired,
	scrollPercentage: PropTypes.number,
	slug: PropTypes.string.isRequired,
	showingCTA: PropTypes.bool.isRequired,
};

const AffiliateSliderModalWithContext = (props) => (
	<ShowCTAContext.Consumer>
		{(showingCTA) => (
			<AffiliateSliderModal showingCTA={showingCTA} {...props} />
		)}
	</ShowCTAContext.Consumer>
);

export default AffiliateSliderModalWithContext;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { fireEvent } from "../../analytics/googleAnalytics";
import ShowCTAContext from "../common/ShowCTAContext";

const ContainerDiv = styled.div`
	&& {
		z-index: 10;
		background-color: var(--color-vitag-green-translucent);
		width: 100%;
		padding: 4px;
		display: grid;
		grid-template-columns: 48px 1fr 48px;
		position: fixed;

		top: ${({ showingCTA }) => (showingCTA ? "52px" : "0px")};
		animation-duration: 1s;
		animation-name: slidein-desktop;

		@media (max-width: 400px) {
			grid-template-columns: 0px auto 48px;
		}

		@keyframes slidein-desktop {
			from {
				top: -64px;
			}

			to {
				top: ${({ showingCTA }) => (showingCTA ? "52px" : "0px")};
			}
		}

		@keyframes slidein-mobile {
			from {
				top: -64px;
			}

			to {
				top: ${({ showingCTA }) => (showingCTA ? "52px" : "0px")};
			}
		}
	}

	> * {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
`;

const ClearButton = styled(IconButton)`
	&& {
		color: rgba(0, 0, 0, 0.2);
		padding: 8px;
		display: flex;
		justify-content: center;
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
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.15);
	}
`;

const AdImg = styled.img`
	width: unset;
	max-height: 48px;
`;

const CopyP = styled.p`
	margin-bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const AdContentDiv = styled.div`
	display: flex;
	justify-content: center;

	> * {
		margin-left: 4px;
		margin-right: 4px;
	}
`;

const AdAnchor = styled.a`
	color: var(--color-base);
	&:hover {
		// Remove the underline on hover
		text-decoration: none;
	}
`;

const AffiliateSlider = (props) => {
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
						category: "Affiliate Ad",
						action: "Show",
						label: `${slug}: ${id}`,
					});
				}
				return true;
			});
		}
	}, [props.scrollPercentage, wasCleared]);

	if (wasCleared || !reachedScrollPercentage) {
		return null;
	}

	const handleAdClick = (event) => {
		event.preventDefault();
		fireEvent({
			category: "Affiliate Ad",
			action: "Click",
			label: `${slug}: ${id}`,
		});
		window.open(link, "_blank");
	};

	return (
		<ContainerDiv showingCTA={showingCTA}>
			<div />
			<div>
				<AdContentDiv>
					{imgSrc ? (
						<AdAnchor
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							onClick={handleAdClick}
						>
							<ImageContentContainer>
								<AdImg src={imgSrc} />
							</ImageContentContainer>
						</AdAnchor>
					) : null}
					<CopyP>
						<b>{copy}</b>
					</CopyP>
					<CTAContentContainer>
						<AdAnchor
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							onClick={handleAdClick}
						>
							<CTAButton>
								<ShoppingCartIcon /> {cta === undefined ? "Buy" : cta}
							</CTAButton>
						</AdAnchor>
					</CTAContentContainer>
				</AdContentDiv>
			</div>
			<div>
				<ClearButton
					onClick={() => setWasCleared((prev) => !prev)}
					disableRipple
					disableFocusRipple
				>
					<ClearIcon />
				</ClearButton>
			</div>
		</ContainerDiv>
	);
};

AffiliateSlider.propTypes = {
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

const AffiliateSliderWithContext = (props) => (
	<ShowCTAContext.Consumer>
		{(showingCTA) => <AffiliateSlider showingCTA={showingCTA} {...props} />}
	</ShowCTAContext.Consumer>
);

export default AffiliateSliderWithContext;

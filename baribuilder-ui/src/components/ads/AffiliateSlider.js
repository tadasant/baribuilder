import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { fireEvent } from "../../analytics/googleAnalytics";

const ContainerDiv = styled.div`
	&& {
		background-color: var(--color-vitag-green-translucent);
		width: 100%;
		border-radius: 3px;
		padding: 4px;
		display: grid;
		grid-template-columns: 48px auto 48px;
		position: fixed;

		bottom: 0px;
		animation-duration: 1s;
		animation-name: slidein-desktop;

		// ShareThis has a 1024 breakpoint where it moves to the bottom
		@media (max-width: 1024px) {
			bottom: 48px;
			animation-name: slidein-mobile;
		}

		@media (max-width: 400px) {
			grid-template-columns: 0px auto 48px;
		}

		@keyframes slidein-desktop {
			from {
				bottom: -64px;
			}

			to {
				bottom: 0px;
			}
		}

		@keyframes slidein-mobile {
			from {
				bottom: -48px;
			}

			to {
				bottom: 48px;
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

// TODO track metric: shown with this id on this slug
// TODO track metric: click
const AffiliateSlider = (props) => {
	const [wasCleared, setWasCleared] = useState(false);
	// useState for reachedScrollPercentage

	const { id, link, copy, imgSrc, cta, percentage } = props.ad;

	// make sure to cover both mobile and desktop case

	if (wasCleared) {
		return null;
	}

	const handleAdClick = (event) => {
		event.preventDefault();
		fireEvent({
			category: "Affiliate Ad",
			action: "Click",
			label: id,
		});
		window.open(link, "_blank");
	};

	return (
		<ContainerDiv>
			<div />
			<div>
				<AdAnchor
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleAdClick}
				>
					<AdContentDiv>
						{imgSrc ? (
							<ImageContentContainer>
								<AdImg src={imgSrc} />
							</ImageContentContainer>
						) : null}
						<CopyP>
							<b>{copy}</b>
						</CopyP>
						<CTAContentContainer>
							<CTAButton>
								<ShoppingCartIcon /> {cta}
							</CTAButton>
						</CTAContentContainer>
					</AdContentDiv>
				</AdAnchor>
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
		cta: PropTypes.string.isRequired,
		imgSrc: PropTypes.string,
		percentage: PropTypes.number,
	}).isRequired,
	amazonImage: PropTypes.object.isRequired,
};

export default AffiliateSlider;

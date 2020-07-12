import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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

		height: 48px;

		// ShareThis has a 1024 breakpoint where it moves to the bottom
		@media (max-width: 1024px) {
			bottom: 48px;
			animation-name: slidein-mobile;
		}

		@keyframes slidein-desktop {
			from {
				bottom: -48px;
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
		max-height: 42px;
		display: flex;
		flex-direction: column;
		justify-content: center;
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

const CTAButton = styled.button`
	&& {
		padding: 8px;
		background-color: var(--color-bg);
		border-radius: 4px;
		text-transform: uppercase;
		line-height: normal;
		color: var(--color-base);
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.15);
		max-height: 32px;
	}
`;

const AdImg = styled.img`
	width: unset;
	max-height: 48px;
`;

const CopyP = styled.p`
	line-height: 32px;
`;

const AdContentDiv = styled.div`
	display: flex;
	justify-content: center;
	max-height: 32px;

	> * {
		margin-left: 4px;
		margin-right: 4px;
	}
`;

// TODO track metric: shown with this id on this slug
// TODO track metric: click
const AffiliateSlider = (props) => {
	const [wasCleared, setWasCleared] = useState(false);
	// useState for reachedScrollPercentage

	const { amazonImage } = props;
	const { id, link, copy, imgSrc, cta, percentage } = props.ad;

	// render an x button to hide it
	// render a box with the copy, optional img,
	// make sure to cover both mobile and desktop case

	if (wasCleared) {
		return null;
	}

	return (
		<ContainerDiv>
			<div />
			<div>
				<AdContentDiv>
					<AdImg src={imgSrc} />
					<CopyP>
						<b>{copy}</b>
					</CopyP>
					<CTAButton>
						{cta} <ShoppingCartIcon />
					</CTAButton>
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
		cta: PropTypes.string.isRequired,
		imgSrc: PropTypes.string,
		percentage: PropTypes.number,
	}).isRequired,
	amazonImage: PropTypes.object.isRequired,
};

export default AffiliateSlider;

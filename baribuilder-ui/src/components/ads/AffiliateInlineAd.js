import React from "react";
import withAdAnalytics from "./hoc/withAdAnalytics";
import withVisibilityTracker from "./hoc/withVisibilityTracker";
import styled from "styled-components";
import { fireEvent } from "../../analytics/googleAnalytics";

const FloatingContainerDiv = styled.div`
	border-radius: 6px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	margin: 16px;
	margin-bottom: 48px;
	margin-top: 48px;
	overflow: hidden;
`;

const CardDiv = styled.div`
	width: 100%;
	border-bottom-color: rgb(60, 72, 78);
	border-bottom-style: none;
	border-bottom-width: 0px;
	border-image-outset: 0;
	border-image-repeat: stretch;
	border-image-slice: 100%;
	border-image-source: none;
	border-image-width: 1;
	border-left-color: rgb(60, 72, 78);
	border-left-style: none;
	border-left-width: 0px;
	border-right-color: rgb(60, 72, 78);
	border-right-style: none;
	border-right-width: 0px;
	border-top-color: rgb(60, 72, 78);
	border-top-style: none;
	border-top-width: 0px;
	box-sizing: border-box;
	color: rgb(60, 72, 78);
	display: grid;
	font-family: -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu,
		Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	font-size: 20px;
	font-stretch: 100%;
	font-style: normal;
	font-variant-caps: normal;
	font-variant-east-asian: normal;
	font-variant-ligatures: normal;
	font-variant-numeric: normal;
	font-weight: 400;
	grid-template-columns: 1fr 1fr;

	@media (max-width: 686px) {
		grid-template-columns: 1fr;
	}

	letter-spacing: normal;
	line-height: 34px;
	margin-bottom: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	padding-bottom: 0px;
	padding-left: 0px;
	padding-right: 0px;
	padding-top: 0px;
	text-rendering: optimizelegibility;
	text-size-adjust: 100%;
	vertical-align: baseline;
`;

const CardColumnLeftDiv = styled.div`
	background-image: url(${(props) => props.imgSrc});
	background-position-x: 50%;
	background-position-y: 50%;
	background-size: cover;
	border-bottom-color: rgb(60, 72, 78);
	border-bottom-style: none;
	border-bottom-width: 0px;
	border-image-outset: 0;
	border-image-repeat: stretch;
	border-image-slice: 100%;
	border-image-source: none;
	border-image-width: 1;
	border-left-color: rgb(60, 72, 78);
	border-left-style: none;
	border-left-width: 0px;
	border-right-color: rgb(60, 72, 78);
	border-right-style: none;
	border-right-width: 0px;
	border-top-color: rgb(60, 72, 78);
	border-top-style: none;
	border-top-width: 0px;
	box-sizing: border-box;
	color: rgb(60, 72, 78);
	display: block;
	font-family: -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu,
		Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	font-size: 20px;
	font-stretch: 100%;
	font-style: normal;
	font-variant-caps: normal;
	font-variant-east-asian: normal;
	font-variant-ligatures: normal;
	font-variant-numeric: normal;
	font-weight: 400;
	letter-spacing: normal;
	line-height: 34px;
	margin-bottom: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	min-height: 200px;
	padding-bottom: 0px;
	padding-left: 0px;
	padding-right: 0px;
	padding-top: 0px;
	text-rendering: optimizelegibility;
	text-size-adjust: 100%;
	vertical-align: baseline;
`;

const CardColumnRightDiv = styled.div`
	border-bottom-color: rgb(60, 72, 78);
	border-bottom-style: none;
	border-bottom-width: 0px;
	border-left-color: rgb(60, 72, 78);
	border-left-style: none;
	border-left-width: 0px;
	border-right-color: rgb(60, 72, 78);
	border-right-style: none;
	border-right-width: 0px;
	border-top-color: rgb(60, 72, 78);
	border-top-style: none;
	border-top-width: 0px;
	box-sizing: border-box;
	color: rgb(60, 72, 78);
	display: block;
	font-family: -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu,
		Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	font-size: 20px;
	font-stretch: 100%;
	font-style: normal;
	font-variant-caps: normal;
	font-variant-east-asian: normal;
	font-variant-ligatures: normal;
	font-variant-numeric: normal;
	font-weight: 400;
	letter-spacing: normal;
	line-height: 34px;
	margin-bottom: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	min-height: 200px;
	padding-bottom: 0px;
	padding-left: 0px;
	padding-right: 0px;
	padding-top: 0px;
	text-rendering: optimizelegibility;
	text-size-adjust: 100%;
	vertical-align: baseline;
`;

const TextHeader = styled.h1`
	// Margin overrides needed to override the post content h1 css
	margin: 0 0 16px 0 !important;

	color: rgb(83, 83, 83);
	display: block;
	font-family: -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu,
		Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	font-size: 28px;
	font-stretch: 100%;
	font-style: normal;
	font-variant-caps: normal;
	font-variant-east-asian: normal;
	font-variant-ligatures: normal;
	font-variant-numeric: normal;
	font-weight: 700;
	letter-spacing: normal;
	line-height: 32.2px;
	margin-block-start: 0px;
	margin-bottom: 20px;
`;
const AdContentDiv = styled.div`
	padding-left: 40px;
	padding-right: 40px;
	padding-top: 20px;
	padding-bottom: 20px;
	display: flex;
	flex-direction: column;
`;
const CTAButton = styled.button`
	width: 100%;

	// From ConvertKit
	background-color: rgb(0, 139, 204);
	color: white;
	border-radius: 3px;
	font-size: 15px;
	font-stretch: 100%;
	font-style: normal;
	font-variant-caps: normal;
	font-variant-east-asian: normal;
	font-variant-ligatures: normal;
	font-variant-numeric: normal;
	font-weight: 700;
	height: 58px;
	letter-spacing: normal;
	line-height: 34px;
	margin-bottom: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	padding-bottom: 12px;
	padding-left: 24px;
	padding-right: 24px;
	padding-top: 12px;
	text-align: center;
	text-indent: 0px;
	text-rendering: auto;
	text-shadow: none;
	text-size-adjust: 100%;
	text-transform: none;
	transition-delay: 0s;
	transition-duration: 0.3s;
	transition-property: all;
	transition-timing-function: ease-in-out;
	vertical-align: baseline;
`;

const AffiliateInlineAd = (props) => {
	const { link, imgSrc, copy, id, slug, cta } = props;
	const label = `${slug}: ${id}`;

	const handleClick = (event) => {
		event.preventDefault();
		fireEvent({
			category: "Affiliate Ad (inline)",
			action: "Click",
			label,
		});
		window.open(link, "_blank");
	};

	return (
		<React.Fragment>
			<FloatingContainerDiv>
				<CardDiv>
					<CardColumnLeftDiv imgSrc={imgSrc} />
					<CardColumnRightDiv>
						<AdContentDiv>
							<TextHeader>{copy}</TextHeader>
							<CTAButton onClick={handleClick}>{cta || "Learn More"}</CTAButton>
						</AdContentDiv>
					</CardColumnRightDiv>
				</CardDiv>
			</FloatingContainerDiv>
		</React.Fragment>
	);
};

export default withVisibilityTracker(withAdAnalytics(AffiliateInlineAd));

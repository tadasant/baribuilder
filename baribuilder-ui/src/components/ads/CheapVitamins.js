import React, { useState } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import keyBy from "lodash/keyBy";
import withAdAnalytics from "./hoc/withAdAnalytics";
import withVisibilityTracker from "./hoc/withVisibilityTracker";

// TODO: add click/focus analytics

const CheapVitaminsContainer = styled.div`
	display: flex;
	box-shadow: 0 0px 2px rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	margin: -16px;
	padding: 16px;
`;

const LeftImage = styled(Img)`
	max-width: 50%;
	max-height: 500px;
	height: unset !important;
	margin-right: 8px;
	border-radius: 8px;

	@media (max-width: 500px) {
		max-height: 300px;
	}
`;

const AdStack = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const AdHeader = styled.h1`
	font-size: 24px;
	text-align: center;
	color: var(--color-base);
`;

const AdCopyContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const AdCopy = styled.p`
	text-align: center;
	margin-bottom: 0;
`;

const AdPrice = styled.p`
	color: green;
	text-align: center;
	font-weight: bold;
	font-size: 24px;
`;

const SurgerySelect = styled.select`
	margin-top: 4px;
	margin-bottom: 4px;
	box-shadow: 0 0px 2px rgba(0, 0, 0, 0.5);
`;

const CTAButton = styled.button`
	background: var(--color-base);
	color: #fff;
	min-width: 50%;
	border-radius: 16px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	font-weight: bold;
	padding: 8px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const tags = [
	{
		name: "Gastric Sleeve",
		value: "gastric-sleeve",
		price: 14,
		landingUrl: "https://ck.baribuilder.com/gastric-sleeve-vitamins",
	},
	{
		name: "Gastric Bypass",
		value: "gastric-bypass",
		price: 15,
		landingUrl: "https://ck.baribuilder.com/gastric-bypass-vitamins",
	},
	{
		name: "Other",
		value: "other",
		price: 14,
		landingUrl: "https://ck.baribuilder.com/other-vitamins",
	},
];

const tagByValue = keyBy(tags, "value");

const CheapVitamins = ({ vitaminImage }) => {
	const [selectedSurgery, setSelectedSurgery] = useState(tags[0].value);

	const handleChange = (event) => {
		setSelectedSurgery(event.target.value);
	};

	return (
		<CheapVitaminsContainer>
			<LeftImage fixed={vitaminImage.childImageSharp.fixed} />
			<AdStack>
				<AdHeader>
					Are you overpaying for{" "}
					<SurgerySelect onChange={handleChange}>
						{tags.map((tag) => (
							<option value={tag.value}>{tag.name}</option>
						))}
					</SurgerySelect>{" "}
					vitamins?
				</AdHeader>

				<AdCopyContainer>
					<AdCopy>You could be paying just</AdCopy>
					<AdPrice>${tagByValue[selectedSurgery].price}/month</AdPrice>
				</AdCopyContainer>

				<ButtonContainer>
					<a
						href={tagByValue[selectedSurgery].landingUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<CTAButton>Show me how</CTAButton>
					</a>
				</ButtonContainer>
			</AdStack>
		</CheapVitaminsContainer>
	);
};

export default withVisibilityTracker(
	withAdAnalytics(CheapVitamins, {
		adContent: "cheap_vitamins_custom_calculator",
	})
);

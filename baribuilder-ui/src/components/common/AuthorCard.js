import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";

const ContainerSection = styled.section`
	display: flex;
`;

const ProfileImgLink = styled(Link)`
	margin-right: 15px;
	width: 150px;
	height: 150px;
`;

const ProfileImg = styled.img`
	width: 100%;
	border-radius: 50%;
`;

const NameHeader = styled.h2`
	font-size: 18px;
	margin-top: 0;
	margin-bottom: 5px;
`;

const BioText = styled.p`
	font-size: 14px;
	color: #5b7a81;
	line-height: 1.3em;
`;

const RoleText = styled.p`
	font-size: 14px;
	font-weight: bold;
	line-height: 1.3em;
	margin-bottom: 5px;
`;

const ContentSection = styled.section``;

const AuthorCard = props => {
	const { author } = props;
	const authorPageUrl = `/blog/author/${author.slug}`;
	return (
		<ContainerSection>
			{author.profile_image && (
				<ProfileImgLink to={authorPageUrl}>
					<ProfileImg src={author.profile_image} />
				</ProfileImgLink>
			)}
			<ContentSection>
				<Link to={authorPageUrl}>
					<NameHeader>{author.name}</NameHeader>
				</Link>
				<RoleText>{props.role || "Author"}</RoleText>
				<BioText>{author.bio}</BioText>
			</ContentSection>
		</ContainerSection>
	);
};

AuthorCard.propTypes = {
	author: PropTypes.shape({
		name: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		bio: PropTypes.string,
		profile_image: PropTypes.string
	}).isRequired,
	role: PropTypes.string
};

export default AuthorCard;

import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {lifecycle} from "recompose";
import styled from 'styled-components';
import Footer from './footer/Footer';
import {FooterContainerGrid} from './footer/Footer.style';
import Navbar from './navbar/Navbar';
import {Body} from './style/Typography';

const PaddedGrid = styled(Grid)`
  padding: 16px 16px 16px 16px;
`;

// Use https://wordtohtml.net/

const TermsAndConditions: SFC = () => {
  return (
    <Fragment>
      <Navbar/>
      <PaddedGrid container direction='row'>
        <Grid item xs={12}>
          <Body dark>
          <p className="p1"><span className="s1"><strong>BariBuilder Terms of Service</strong></span></p>
          <p className="p1"><span className="s1">Last Updated: October 1, 2018</span></p>
          <p className="p1"><span className="s1"><strong>Introduction</strong></span></p>
          <p className="p1"><span
            className="s1">Vita.G, LLC (&ldquo;Vita.G,&rdquo; &ldquo;we&rdquo; or &ldquo;us&rdquo;) provides an online service, including, but not limited to the BariBuilder website, baribuilder.com (the &ldquo;Site&rdquo;), and related content or services (collectively with the Site, the &ldquo;Service&rdquo;). THESE TERMS OF SERVICE (THE &ldquo;TERMS&rdquo;) ARE A LEGAL AGREEMENT BETWEEN YOU AND VITA.G, LLC AND GOVERN YOUR USE OF THE SERVICE. The terms &ldquo;you&rdquo; and &ldquo;user&rdquo; shall refer to all individuals and entities that access the Service.</span>
          </p>
          <p className="p1"><span className="s1">These Terms include a release by you of, and limitations on, claims for certain damages against us that may arise out of your use of the Service. By using the Service, you are agreeing to the release and limitations.</span>
          </p>
          <p className="p1"><span className="s1">By accepting these Terms, you are agreeing to the arbitration agreement (unless you follow the opt-out procedure) described below in these Terms to resolve any disputes with Vita.G. &nbsp;</span>
          </p>
          <p className="p1"><span className="s1">By your affirmative actions of registering for and/or using the Service, you are agreeing to these Terms.</span>
          </p>
          <p className="p1"><span className="s1"><strong>The Service</strong></span></p>
          <p className="p1"><span className="s1">The Service is a website where users may evaluate, investigate, and ultimately decide to purchase supplements related to bariatric procedures and related health options. &nbsp;The Service is not a substitute for your personal physician&rsquo;s recommendations for overall health and nutritional support, post-bariatric operative care and/or nutritional supplementation.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Health-Related Information:</strong></span></p>
          <p className="p1"><span className="s1">The information contained in the website is provided for informational purposes only and is not meant to substitute for the advice provided by your doctor or other health care professional. You should not use the information available on or through the BariBuilder website (including, but not limited to, information that may be provided by healthcare and/or nutrition professionals employed by, or contracting with, Vita.G) for diagnosing or treating a health problem or disease, or prescribing any medication. Information and statements regarding dietary supplements have not been evaluated by the Food and Drug Administration unless specifically so stated.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Eligibility</strong></span></p>
          <p className="p1"><span className="s1">The Service is offered and available to users who are 18 years of age or older. By using the Service, you agree that you are of legal age to form a binding contract with Vita.G, and these Terms and register for the Service. Vita.G may, in its discretion, refuse to offer the Service to any person and change its eligibility criteria at any time. Your right to access the Service is revoked where these Terms or use of the Service is prohibited and, in such circumstances, you agree not to use or access the Service in any way.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Communication</strong></span></p>
          <p className="p1"><span className="s1">When you visit the website or send emails to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by email or by posting notices on the website or through the Service. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that those communications be in writing.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Necessary Equipment</strong></span></p>
          <p className="p1"><span className="s1">Use of the Service may require a compatible hardware device and Internet access. Your ability to use the Service may be affected by performance of these items. You acknowledge and agree that all such system requirements, which may be changed from time to time, are your responsibility, and your mobile carrier&rsquo;s standard charges, data rates and other fees may apply. Further, you agree to always use the most recent version of the Service made available by Vita.G.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Privacy</strong></span></p>
          <p className="p1"><span
            className="s1">Please read our Privacy Policy for more information about Vita.G&rsquo;s privacy at&nbsp;
            <a href="https://www.iubenda.com/privacy-policy/8172131"><span
              className="s2">https://www.iubenda.com/privacy-policy/25172832</span></a>.</span></p>
          <p className="p1"><span className="s1"><strong>License to Use the Service; Ownership</strong></span></p>
          <p className="p1"><span className="s1">Subject to your compliance with these Terms, Vita.G grants to you a limited license to access and use the Service during the term of these Terms solely for your own personal, non-commercial purposes. This license is personal to you and may not be assigned or sublicensed to anyone else.</span>
          </p>
          <p className="p1"><span className="s1">You will not reproduce, copy, transfer, give access to, distribute, sell, rent, lease, assign, sublicense, create derivative works from, decompile, reverse engineer, or disassemble the Service or any part of the Service in any manner whatsoever.</span>
          </p>
          <p className="p1"><span className="s1">You acknowledge and agree that nothing in these Terms conveys to you any ownership, intellectual property rights or other proprietary interest in or relating to the Service and any other Vita.G services, or any modifications or derivative works of any of the foregoing. The Service is licensed, not sold, to you and is owned by Vita.G and its licensors. Except as expressly set forth in these Terms, Vita.G reserves all right, title and interest, including all intellectual property and other rights, in and to the Service. You agree not to obscure or alter or remove any patent, copyright, trademark or other proprietary notice or legend contained on or in the Service.</span>
          </p>
          <p className="p1"><span className="s1">We welcome your comments, feedback, suggestions, and other communications regarding the Site and Service (collectively, &ldquo;Feedback&rdquo;). While you are not obligated to provide Feedback, in the event that you provide Feedback, you grant to Vita.G a worldwide, non-exclusive, transferrable, assignable, sub-licensable, perpetual, irrevocable, royalty-free license to copy, distribute, create derivative works of, publicly display and perform and otherwise exploit the Feedback and to use, make, have made, sell, offer for sale, import and export products and services based on such Feedback. For this reason, we ask that you not send Vita.G any Feedback that you do not wish to license to us as set forth above.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Accounts</strong></span></p>
          <p className="p1"><span className="s1">You may browse the Site without registering, but as a condition to using certain aspects of the Service, you are required to register with Vita.G and agree that you will provide Vita.G with accurate and complete registration information (including an email address and a password you will use to access the Service) and keep your registration information accurate and up-to-date. Failure to do so is a breach of these Terms, which may result in immediate termination of your BariBuilder account. &nbsp;You agree to refrain from using a username that is the name of another person other than you or selecting a username that is not lawfully available to use, or violates any trademark or copyright. &nbsp;Usernames that are vulgar, obscene, or offensive will violate the terms of this Agreement and result in Account termination.</span>
          </p>
          <p className="p1"><span className="s1">If you register with BariBuilder using your Facebook or Google account, we automatically request your email address and publicly available information, including your account ID, name and gender as well as public information for authentication purposes. If you revisit Vita.G while logged into one of these social media services, we&rsquo;ll automatically log you into your Vita.G account. If you don&rsquo;t register for Vita.G via social media but later attempt to log into Vita.G using your social media credentials, we&rsquo;ll connect your social media and Vita.G accounts and request the necessary information as if you were newly registering. Information gathered by any social media service in connection with your use of their products, features, and services are governed by each service&rsquo;s specific data policy.</span>
          </p>
          <p className="p1"><span className="s1">You acknowledge that Vita.G has no obligation to monitor your or any other user&rsquo;s access or use of the Site or the Service or edit any User Content (as defined below). Vita.G reserves the right, at any time and without prior notice, to refuse registration of, remove or disable an account (temporarily or permanently) in Vita.G&rsquo;s sole discretion. You are solely responsible and liable for activity that occurs on your account and shall be responsible for maintaining the confidentiality of your account and password. You agree to immediately notify Vita.G in writing of any unauthorized use of your account, or other account related security breach of which you are aware.</span>
          </p>
          <p className="p1"><span className="s1">Unless required by law, you agree and acknowledge that your BariBuilder Account is non-transferable and any rights to your BariBuilder Account or Content therein terminate upon your death. &nbsp;In the event of your death, a valid copy of a death certificate may permit the proper party to terminate your Account and related Content on your behalf. &nbsp;Contact Vita.G&nbsp;
            <a href="mailto:feedback@baribuilder.com"><span className="s2">feedback@baribuilder.com</span></a>&nbsp;for additional assistance. &nbsp;</span>
          </p>
          <p className="p1"><span className="s1">&nbsp;</span></p>
          <p className="p1"><span className="s1"><strong>Service Purchases</strong></span></p>
          <p className="p1"><span className="s1">Vita.G uses Stripe Payments, Inc. (&ldquo;Stripe&rdquo;) as one of its third party electronic payment processing provider for payment services (e.g. card acceptance, merchant settlement, and related services) (&ldquo;Payment Services&rdquo;) for payments related to the Service. By making use of some or all of these Payment Services on the Service, you agree to be bound by Stripe&rsquo;s terms and conditions (available at&nbsp;
            <a href="https://stripe.com/us/terms/"><span className="s2">https://stripe.com/us/terms/</span></a>) as well as its privacy policy (available at&nbsp;
            <a href="https://stripe.com/us/privacy/"><span className="s2">https://stripe.com/us/privacy/</span></a>) and hereby consent and authorize us to delegate the authorizations and share the information you provide to us with our third party electronic payment processing provider(s) to the extent required to provide the Payment Services to you. Stripe may also be contacted directly for payments support at&nbsp;
            <a href="https://support.stripe.com/email"><span
              className="s2">https://support.stripe.com/email</span></a>. &nbsp;In addition to Stripe&rsquo;s payment processing features, we may also use other third-party payment providers such as Apple Pay and Braintree. &nbsp;By making use of some or all of these Payment Services on the Service, you agree to be bound by Apple Pay&rsquo;s and Braintree&rsquo;s terms and conditions.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Service Refunds; Credits; Taxes</strong></span></p>
          <p className="p1"><span className="s1">At Vita.G&rsquo;s sole discretion, refunds or credits may be granted as a result of specific refund guarantee promotions, or to correct any errors made by Vita.G. All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities, and the Client shall be responsible for payment of all taxes, levies, or duties associated with his or her purchases hereunder, excluding United States (federal or state) taxes.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Modification</strong></span></p>
          <p className="p1"><span className="s1">Vita.G reserves the right, at its sole discretion, to modify the website or the Service or to modify these Terms, including the fees associated with the Service, at any time and without prior notice. A link to the most current Terms will be available on the BariBuilder home page and we will indicate the date of the &ldquo;Latest Updated&rdquo; at the top of the Terms. If we materially modify these Terms, we will post a notice on the Service and, if you&rsquo;ve provided Vita.G with your email by creating an account through the Service, we will also notify you by email.</span>
          </p>
          <p className="p1"><span className="s1">Your continued use of the Service following the posting of such changes constitutes your acceptance of the modified Terms. If the modified Terms are not acceptable to you, your only recourse is to cease using the Service.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Vita.G&rsquo;s Relationship to the Parties</strong></span></p>
          <p className="p1"><span className="s1">Vita.G&rsquo;s website is merely a conduit where well-informed, independent, and discerning individuals may evaluate and ultimately decide to purchase select post-bariatric surgery supplements and general health options offered through the website. &nbsp;</span>
          </p>
          <p className="p1"><span className="s1">&nbsp;</span></p>
          <p className="p1"><span className="s1"><strong>Links/Third Party Websites</strong></span></p>
          <p className="p1"><span className="s1">As part of our services and its resident features and functions, you may encounter materials from third parties and/or hyperlinks to other Content, resources, or websites. &nbsp;Because we have no control over third parties and their related materials, you acknowledge and agree that Vita.G shall not be responsible or liable for any alleged damages you may have incurred either directly or indirectly.</span>
          </p>
          <p className="p1"><span className="s1">When you access a non-Vita.G website, even one that may contain the Vita.G logo, please understand that it is independent from Vita.G, and that Vita.G has no control over the content on that website. In addition, a link to a non-Vita.G website does not mean that Vita.G endorses or accepts any responsibility for the content, or the use, of such website. It is up to you to take precautions to ensure that whatever you select for your use is free of viruses, worms, trojan horses and other items of a destructive nature.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Intellectual Property Rights</strong></span></p>
          <p className="p1"><span className="s1">VITA.G, BARIBUILDER, the VITA.G Logo, and the BARIBUILDER Logo are service marks, trademarks, and/or trade dress of Vita.G or otherwise proprietary to Vita.G and may not be used by you for any reason other than as expressly permitted by these terms. All website content, design, text, graphics, and interfaces; the collection, selection, and arrangement thereof; and all software are the property of, or duly licensed to, Vita.G. You acknowledge that Vita.G and/or third-party content providers remain the owners of all website and Service material and that you do not acquire any of those ownership rights by downloading, copying or using any such material in accordance with these Terms.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Acceptable Use Policy</strong></span></p>
          <p className="p1"><span className="s1"><strong>Content</strong></span></p>
          <p className="p1"><span className="s1">All Content, whether publicly posted or privately transmitted, is the sole responsibility of the person who originated such Content. Vita.G cannot guarantee the authenticity of any Content or data which users may provide about themselves. You acknowledge that all Content accessed by you using the Service is at your own risk and you will be solely responsible and liable for any damage or loss to you or any other party resulting therefrom. For purposes of these Terms, the term &ldquo;Content&rdquo; includes, without limitation, any location information, videos, audio clips, comments, information, data, text, photographs, software, scripts, graphics, and interactive features generated, provided, or otherwise made accessible by Vita.G on or through the Service.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Content Backup</strong></span></p>
          <p className="p1"><span className="s1">Although Vita.G makes reasonable efforts to provide proper care and skill in delivering its services, Vita.G does not guarantee, warrant, or covenant that any Content you access and/or store via the services will not be accidentally lost, corrupted, or damaged. &nbsp;Given this reality, you agree and acknowledge that it is your sole responsibility to back up any important Content on your device(s) and/or computer(s).</span>
          </p>
          <p className="p1"><span className="s1"><strong>Vita.G Content</strong></span></p>
          <p className="p1"><span className="s1">The Service contains Content specifically provided by Vita.G or its partners and such Content is protected by copyrights, trademarks, service marks, patents, trade secrets or other proprietary rights and laws, as applicable. You shall abide by and maintain all copyright notices, information, and restrictions contained in any Content accessed through the Service.</span>
          </p>
          <p className="p1"><span className="s1">Subject to these Terms, Vita.G grants each user a worldwide, non-exclusive, non-sublicensable and non-transferable license to use the Content, solely for personal, non-commercial use in connection with the Service. Any other use, reproduction, modification, distribution or storage of any Content is expressly prohibited without prior written permission from Vita.G, or from the copyright holder identified in such Content&rsquo;s copyright notice, as applicable.</span>
          </p>
          <p className="p1"><span className="s1"><strong>User Submissions</strong></span></p>
          <p className="p1"><span className="s1">Content added, created, uploaded, submitted, distributed, posted or otherwise obtained through the Service by users, including Content that is added to the Service in connection with users linking their accounts to third party websites and services, is collectively referred to as, &ldquo;User Submissions.&rdquo;</span>
          </p>
          <p className="p1"><span className="s1">By submitting User Submissions on the website or otherwise through the Service, you grant Vita.G a worldwide, non-exclusive, royalty-free, fully paid, sublicensable and transferable license to use, copy, edit, modify, reproduce, distribute, prepare derivative works of, display, perform, and otherwise fully exploit the User Submissions in connection with the website, the Service and Vita.G&rsquo;s (and its successors and assigns&rsquo;) business, including without limitation for promoting and redistributing part or all of the website (and derivative works thereof) or the Service in any media formats and through any media channels (including, without limitation, third party websites and feeds). For clarity, the foregoing license grant to Vita.G does not affect your other ownership or license rights in your User Submission(s), including the right to grant additional licenses to the material in your User Submission(s), unless otherwise agreed in writing with Vita.G.</span>
          </p>
          <p className="p1"><span className="s1">You acknowledge and agree that you have all rights to grant such license to us without infringement or violation of any third party rights, including without limitation, any privacy rights, publicity rights, copyrights, contract rights, or any other intellectual property or proprietary rights.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Conduct, Content and Use Restrictions</strong></span></p>
          <p className="p1"><span className="s1">As a condition of use, you agree not to use the Service for any purpose that is prohibited by these Terms. You are responsible for all of your activity in connection with the Service. Additionally, you shall abide by all applicable local, state, national and international laws and regulations and, if you represent a business, any advertising, marketing, privacy, or other self-regulatory code(s) applicable to your industry.</span>
          </p>
          <p className="p1"><span className="s1">You are solely responsible for the Content that you post, upload, transmit, publish or display on or through the Service (hereinafter, &ldquo;post&rdquo;), or transmit to other users. You will not provide inaccurate, misleading or false information to Vita.G or to any other user. If information provided to Vita.G or another user subsequently becomes inaccurate, misleading or false, you will promptly notify us of such change. You will not post on the Service, or transmit to other users, any defamatory, inaccurate, abusive, obscene, profane, offensive, sexually oriented, threatening, harassing, racially offensive, or illegal material, or any material that infringes or violates another party&rsquo;s rights (including, but not limited to, intellectual property rights, and rights of privacy and publicity). Without limiting the previous sentence, you may not post any Content or use the Service in any way that:</span>
          </p>
          <ul className="ul1">
            <li className="li2"><span className="s4">is patently offensive, such as Content that promotes racism, bigotry, hatred or physical harm of any kind against any group or individual;</span>
            </li>
            <li className="li2"><span className="s4">intimidates, threatens, or otherwise harasses other users of the Service, or advocates harassment of another person;</span>
            </li>
            <li className="li2"><span className="s4">is false, misleading or promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory or libelous;</span>
            </li>
            <li className="li2"><span className="s4">impersonates any person or entity, including any employee or representative of Vita.G;</span>
            </li>
            <li className="li2"><span className="s4">includes anyone&rsquo;s identification documents or sensitive financial information;</span>
            </li>
            <li className="li2"><span className="s4">breaches the Privacy Policy and/or any of the other policies you acknowledge herein;</span>
            </li>
            <li className="li2"><span className="s4">imposes or may impose (as determined by Vita.G in its sole discretion) an unreasonable or disproportionately large load on Vita.G&rsquo;s (or its third party providers&rsquo;) infrastructure;</span>
            </li>
            <li className="li2"><span className="s4">interferes or attempts to interfere with the proper working of the Service or any activities conducted on the Service;</span>
            </li>
            <li className="li2"><span className="s4">bypasses any measures Vita.G may use to prevent or restrict access to the Service (or other accounts, computer systems or networks connected to the Service);</span>
            </li>
            <li className="li2"><span className="s4">attempts to collect personal information about any other user of the Service or any third party without such user or third party&rsquo;s informed consent;</span>
            </li>
            <li className="li2"><span className="s4">involves commercial activities (whether or not for profit) and/or sales without Vita.G&rsquo;s prior written consent, such as contests, sweepstakes, barter, advertising, or pyramid schemes;</span>
            </li>
            <li className="li2"><span className="s4">provides instructional information about illegal activities such as making or buying illegal weapons, violating someone&rsquo;s privacy, or providing or creating computer viruses;</span>
            </li>
            <li className="li2"><span className="s4">contains or transmits viruses, corrupted data or other harmful, disruptive or destructive files or code;</span>
            </li>
            <li className="li2"><span className="s4">involves the transmission of &ldquo;junk mail&rdquo;, &ldquo;chain letters,&rdquo; or unsolicited mass mailing or &ldquo;spamming&rdquo;;</span>
            </li>
            <li className="li2"><span className="s4">use any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, &ldquo;data mine&rdquo;, or in any way reproduce or circumvent the navigational structure or presentation of the Service or its contents;</span>
            </li>
            <li className="li2"><span className="s4">infringes any third party&rsquo;s intellectual property rights or privacy rights;</span>
            </li>
            <li className="li2"><span
              className="s4">otherwise takes any action in violation of these Terms or Vita.G&rsquo;s guidelines and policies.</span>
            </li>
          </ul>
          <p className="p1"><span className="s1">Vita.G has the right, but not the obligation, to monitor all conduct on and Content submitted to the Service.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Digital Millennium Copyright Act</strong></span></p>
          <p className="p1"><span className="s1"><strong>General</strong></span></p>
          <p className="p1"><span className="s1">Vita.G respects the intellectual property of others, and we ask our users to do the same. Each user is responsible for ensuring that the Content they upload to Vita.G does not infringe any third party copyright.</span>
          </p>
          <p className="p1"><span className="s1">Vita.G will promptly remove materials in accordance with the Digital Millennium Copyright Act (&ldquo;DMCA&rdquo;) if properly notified that the materials infringe a third party&rsquo;s copyright. In addition, Vita.G may, in appropriate circumstances, terminate the accounts of repeat copyright infringers.</span>
          </p>
          <p className="p1"><span className="s1"><strong>DMCA Takedown Notice</strong></span></p>
          <p className="p1"><span className="s1">If you believe that your work has been copied in a way that constitutes copyright infringement, please provide us with a written notice containing the following information:</span>
          </p>
          <ol className="ol1">
            <li className="li2"><span
              className="s4">Your name, address, telephone number, and email address (if any).</span></li>
            <li className="li2"><span className="s4">A description of the copyrighted work that you claim has been infringed.</span>
            </li>
            <li className="li2"><span className="s4">A description of where the material that you claim is infringing is located on Vita.G, sufficient for Vita.G to locate the material.</span>
            </li>
            <li className="li2"><span className="s4">A statement that you have a good faith belief that the use of the copyrighted work is not authorized by the copyright owner, its agent, or the law.</span>
            </li>
            <li className="li2"><span className="s4">A statement by you that the information in your notice is accurate and, UNDER PENALTY OF PERJURY, you are the copyright owner or authorized to act on the copyright owner&rsquo;s behalf.</span>
            </li>
            <li className="li2"><span className="s4">An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest.</span>
            </li>
          </ol>
          <p className="p1"><span className="s1">You may submit this information via:</span></p>
          <ol className="ol1">
            <li className="li2"><span className="s4">Email:&nbsp;feedback@baribuilder.com</span></li>
            <li className="li3"><span className="s1">Offline: Vita.G, LLC Copyright Agent (see below)</span></li>
          </ol>
          <p className="p4">&nbsp;</p>
          <p className="p1"><span className="s1"><strong>DMCA Counter-notification</strong></span></p>
          <p className="p1"><span className="s1">If you believe that your material has been removed by mistake or misidentification, please provide Vita.G with a written counter-notification containing the following information:</span>
          </p>
          <ol className="ol1">
            <li className="li2"><span className="s4">Your name, address, and telephone number.</span></li>
            <li className="li2"><span className="s4">A description of the material that was removed and the location where it previously appeared.</span>
            </li>
            <li className="li2"><span className="s4">A statement UNDER PENALTY OF PERJURY that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</span>
            </li>
            <li className="li2"><span className="s4">A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located, or if your address is outside of the United States, any judicial district in which Vita.G, Inc. may be found (which includes the Suffolk County Superior Court), and that you will accept service of process from the person who filed the original DMCA notice or an agent of that person.</span>
            </li>
            <li className="li2"><span className="s4">Your electronic or physical signature.</span></li>
          </ol>
          <p className="p1"><span className="s1">You may submit this information via:</span></p>
          <ol className="ol1">
            <li className="li2"><span className="s4">Email:&nbsp;feedback@baribuilder.com</span></li>
            <li className="li2"><span className="s4">Offline: Vita.G, LLC&rsquo;s Copyright Agent (see below)</span>
            </li>
          </ol>
          <p className="p1"><span className="s1">Please note that we will provide complete counter-notifications to the person making the DMCA claim. That person may elect to file a lawsuit against you for copyright infringement. If we do not receive notice that a lawsuit has been filed within ten (10) business days after we provide notice of your counter-notification, we will restore the disabled materials. Until that time, your materials will remain disabled.</span>
          </p>
          <p className="p1"><span className="s1">Warning: In filing a DMCA notice or counter-notification, please make sure that you have complied with all of the above requirements. If we request additional information necessary to make DMCA your notice or counter-notification complete, please provide that information promptly. If you fail to comply with all of the requirements, your notification or counter-notification may not be processed.</span>
          </p>
          <p className="p1"><span className="s1">In addition, please make sure that all of the information you provide is accurate. UNDER SECTION 512(f) OF THE COPYRIGHT ACT, 17 U.S.C. &sect; 512(f), ANY PERSON WHO KNOWINGLY MATERIALLY MISREPRESENTS THAT MATERIAL OR ACTIVITY IS INFRINGING OR WAS REMOVED OR DISABLED BY MISTAKE OR MISIDENTIFICATION MAY BE SUBJECT TO LIABILITY.</span>
          </p>
          <p className="p1"><span className="s1">If you have questions about the legal requirements of a DMCA notice, please contact an attorney or see Section 512(c)(3) of the U.S. Copyright Act, 17 U.S.C. &sect; 512(c)(3), for more information. If you have questions about the legal requirements of a DMCA counter-notification, please contact an attorney or see Section 512(g)(3) of the U.S. Copyright Act, 17 U.S.C. &sect; 512(g)(3), for more information.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Vita.G LLC&rsquo;s Copyright Agent</strong></span></p>
          <p className="p1"><span className="s1">You may send a DMCA notice, a DMCA counter-notification, or any inquiries concerning intellectual property to Vita.G, Inc.&rsquo;s Copyright Agent:</span>
          </p>
          <p className="p5"><span className="s4"><em>Vita.G, LLC</em></span><span
            className="s1"><em><br/></em></span><span
            className="s4"><em>Email:&nbsp;feedback@baribuilder.com</em></span></p>
          <p className="p1"><span className="s1"><strong>No Medical or Health Advice</strong></span></p>
          <p className="p1"><span className="s1">The website and the Service are not intended to and do not provide health advice, medical advice, professional diagnosis, opinion, treatment or services to you or to any other individual. The information provided in, and provided through this website, or through linkages to other websites, are not intended to be medical or professional care, and you should not use the website or the Service in place of a visit, call consultation or the advice of your physician or other healthcare provider. In fact, you should consult with a healthcare professional before beginning any diet, exercise, and/or supplementation program. &nbsp;Vita.G is not liable or responsible for any advice, course of treatment, diagnosis or any other information, services or product you obtain through the website or the Service.</span>
          </p>
          <p className="p1"><span className="s1">IF YOU BELIEVE YOU HAVE A MEDICAL EMERGENCY, YOU SHOULD IMMEDIATELY CALL 911 OR YOUR PHYSICIAN. Never disregard medical or professional advice, or delay seeking it, because of something you read on the website or a linked website or learn through your use of the Service. Never rely on information on the website or that you learn through the Service in place of seeking professional medical advice. You should also ask your physician or other healthcare provider to assist you in interpreting any information in this website or in the linked websites, or in applying the information to your individual case.</span>
          </p>
          <p className="p1"><span className="s1"><strong>No Warranties</strong></span></p>
          <p className="p1"><span className="s1">THE SERVICE, AND THE CONTENT, MATERIAL, AND INFORMATION CONTAINED AND/OR ADVERTISED THEREIN, ARE PROVIDED ON AN &ldquo;AS IS&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. YOU EXPRESSLY AGREE THAT USE OF THE SERVICE, INCLUDING ALL CONTENT OR DATA DISTRIBUTED BY, DOWNLOADED OR ACCESSED FROM OR THROUGH THE SERVICE, IS AT YOUR SOLE RISK. EXCEPT AS EXPRESSLY PROVIDED IN THE SERVICE, WE DISCLAIM ALL WARRANTIES INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT RELATED TO THE INFORMATION, MATERIALS, CONTENT ON OR GOODS PURCHASED THROUGH THE SERVICE. WE DO NOT REPRESENT OR WARRANT THAT MATERIALS IN THE SERVICE ARE ACCURATE, COMPLETE, RELIABLE, CURRENT, OR ERROR-FREE OR UNINTERRUPTED. WE DO NOT PROMISE THAT ANY DEFECTS WILL BE CORRECTED, OR THAT YOUR USE OF THE SERVICE WILL PROVIDE SPECIFIC RESULTS. SOME STATES DO NOT ALLOW LIMITATIONS OR EXCLUSIONS ON WARRANTIES, SO THE LIMITATIONS ABOVE MAY NOT APPLY TO CERTAIN USERS. IN ANY SUCH JURISDICTION, THE ABOVE EXCLUSIONS AND LIMITATIONS SHALL INSTEAD BE IMPUTED AS REWRITTEN SO AS TO APPROXIMATE THE ABOVE EXCLUSIONS AND LIMITATIONS TO THE FULLEST EXTENT PERMISSIBLE BY THE LAWS OF SUCH JURISDICTION.</span>
          </p>
          <p className="p1"><span className="s1">WE ARE NOT RESPONSIBLE FOR TYPOGRAPHICAL ERRORS OR OMISSIONS RELATING TO THE CONTENT OR MATERIAL. WHILE WE ATTEMPT TO ENSURE YOUR ACCESS AND USE OF THE SERVICE IS SAFE, WE CANNOT AND DO NOT REPRESENT OR WARRANT THAT THE SERVICE OR ITS SERVER(S) ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. ALL USERS ACCESSING THE SERVICE FROM OUTSIDE THE UNITED STATES OF AMERICA ASSUME FULL RESPONSIBILITY FOR COMPLIANCE WITH LOCAL LAWS, IF APPLICABLE.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Limitation of Liability</strong></span></p>
          <p className="p1"><span className="s1">VITA.G IS NOT RESPONSIBLE FOR DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE, OR YOUR INABILITY TO USE THE SERVICE. IN NO EVENT WILL VITA.G, OR ITS DIRECTORS, OFFICERS, EMPLOYEES, SUPPLIERS, LICENSORS, AND/OR ASSIGNS (COLLECTIVELY THE &ldquo;VITA.G PARTIES&rdquo;), BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, SPECIAL, PUNITIVE OR OTHER CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, ARISING FROM YOUR USE OF THE SERVICE, INCLUDING, WITHOUT LIMITATION, ANY LOST PROFITS, BUSINESS INTERRUPTION, LOSS OF PROGRAMS OR OTHER DATA EVEN IF WE ARE EXPRESSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, YOU AGREE THAT THE VITA.G PARTIES&rsquo; AGGREGATE LIABILITY WILL BE LIMITED TO TWO HUNDRED DOLLARS.</span>
          </p>
          <p className="p1"><span className="s1">In some jurisdictions, it is not permitted to limit certain types of liability and therefore such limitations to the extent they exclude such liability may not apply to you. IN SUCH JURISDICTIONS, VITA.G&rsquo;S LIABILITY WILL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY APPLICABLE LAW.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Indemnification</strong></span></p>
          <p className="p1"><span className="s1">As a requirement to use our services, you expressly agree to defend, indemnify, and hold Vita.G and its subsidiaries, affiliates, directors, officers, employees, agents, and licensors, harmless from any claim or demand thereof, including reasonable attorney&rsquo;s fees, made by a third party, relating to or arising from: (a) any violation by you of this Agreement; (b) any Content in its entirety that you upload, transmit, or make available through the services; (c) your use of the services; (d) any violation that Vita.G determines through its reasonable investigations of a suspected violation(s) of this Agreement; or (e) your violation of another&rsquo;s rights. &nbsp;This express waiver and indemnity provision applies to all violations described in or contemplated by this Agreement. &nbsp;This obligation shall survive the termination or expiration of this Agreement and/or your use of the services.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Termination</strong></span></p>
          <p className="p1"><span className="s1">Vita.G may terminate these Terms at any time without notice, discontinue or remove the website or any portions thereof or suspend or terminate your access and use of the website and/or the Service at any time, with or without cause, in Vita.G&rsquo;s sole discretion. In the event of termination, the intellectual property, disclaimers, releases, arbitration agreement, &nbsp;limitations of liability provisions and any other provisions which by their nature are intended to survive set forth in these Terms will survive.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Dispute Resolution: Arbitration</strong></span></p>
          <p className="p1"><span className="s1"><strong>Introduction</strong></span></p>
          <p className="p1"><span className="s1">This section includes an arbitration agreement. Please read it carefully. You may opt out of the arbitration agreement by following the opt out procedure described below.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Informal Process First</strong></span></p>
          <p className="p1"><span className="s1">You agree that in the event of any dispute between you and Vita.G, you will first contact Vita.G and make a good faith sustained effort to resolve the dispute before resorting to more formal means of resolution, including without limitation any court action.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Arbitration Agreement</strong></span></p>
          <p className="p1"><span className="s1">After the informal dispute resolution process any remaining dispute, controversy, or claim (collectively, &ldquo;Claim&rdquo;) relating in any way to your use of Vita.G&rsquo;s services, including the Service, or relating in any way to the communications between you and Vita.G or any other user of the Service, will be finally resolved by binding arbitration. This mandatory arbitration agreement applies equally to you and Vita.G. However, this arbitration agreement does not (a) govern any Claim by Vita.G for infringement of its intellectual property or access to the Service that is unauthorized or exceeds authorization granted in these Terms or (b) bar you from making use of applicable small claims court procedures in appropriate cases. If you are an individual you may opt out of this arbitration agreement within thirty (30) days of the first of the date you access or use this Service by following the procedure described below.</span>
          </p>
          <p className="p1"><span className="s1">Arbitration is more informal than a lawsuit in court. There is no judge or jury in arbitration. Instead, the dispute is resolve by a neutral arbitrator. Court review of an arbitration award is limited. Except to the extent the parties agree otherwise, arbitrators can award the same damages and relief that a court can award. You agree that the U.S. Federal Arbitration Act governs the interpretation and enforcement of this provision. This arbitration provision will survive any termination of these Terms.</span>
          </p>
          <p className="p1"><span className="s1">If you wish to begin an arbitration proceeding, after following the informal dispute resolution procedure, you must send a letter requesting arbitration and describing your claim to Vita.G, LLC, 16192 Coastal Highway, Lewes, Delaware 19958. The arbitration will be administered by the American Arbitration Association (AAA) under its rules including, if you are an individual, the AAA&rsquo;s Supplementary Procedures for Consumer-Related Disputes. If you are not an individual or have used the Service on behalf of an entity, the AAA&rsquo;s Supplementary Procedures for Consumer-Related Disputes will not be used. The AAA&rsquo;s rules are available at&nbsp;
            <a href="http://www.adr.org/"><span className="s2">http://www.adr.org</span></a>&nbsp;or by calling 1-800-778-7879.</span>
          </p>
          <p className="p1"><span className="s1">The number of arbitrators will be one. You may choose to have the arbitration conducted by telephone, based on written submissions, or in person in the county where you live or at another mutually agreed location. The arbitration will be conducted in the English language. Delaware law will apply. Judgment on the award rendered by the arbitrator may be entered in any court having jurisdiction thereof.</span>
          </p>
          <p className="p1"><span className="s1">Payment of all filing, administration and arbitrator fees will be governed by the AAA&rsquo;s rules</span>
          </p>
          <p className="p1"><span className="s1">The arbitrator, and not any federal, state, or local court, will have exclusive authority to resolve any dispute relating to the interpretation, applicability, unconscionability, arbitrability, enforceability, or formation of this arbitration agreement, including any claim that all or any part of this arbitration agreement is void or voidable.</span>
          </p>
          <p className="p1"><span className="s1">If you do not want to arbitrate disputes with Vita.G and you are an individual, you may opt out of this arbitration agreement by sending an email at feedback@baribuilder.com within thirty (30) days of the first of the date you access or use the Service.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Miscellaneous</strong></span></p>
          <p className="p1"><span className="s1">If any of the provisions of these Terms are held by a court or other tribunal of competent jurisdiction to be void or unenforceable, such provisions shall be limited to the minimum extent necessary and replaced with a valid provision that best embodies these Terms.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Choice of Law</strong></span></p>
          <p className="p1"><span className="s1">These Terms, the Service, and your use hereof, are governed by the laws of Delaware, without regard to Delaware&rsquo;s choice of law provisions, and any claim arising out of your use of the website or Service must be brought in New York County, New York. The application of the United Nations Convention on Contracts for the International Sale of Goods is expressly excluded.</span>
          </p>
          <p className="p1"><span className="s1"><strong>Electronic Contracting</strong></span></p>
          <p className="p1"><span className="s1">You acknowledge and agree that your use of the services includes your ability to enter into agreements or related transactions electronically. &nbsp;YOUR ELECTRONIC SUBMISSSION TO VITA.G ACKNOWLEDGES YOUR AGREEMENT AND INTENT TO BY BOUND BY THE TERMS OF THIS AGREEMENT IN ITS ENTIRETY. &nbsp;In order to access and store your electronic transaction records with Vita.G, you accept full responsibility for installing required hardware and software.</span>
          </p>
          </Body>
        </Grid>
      </PaddedGrid>
      <FooterContainerGrid container>
        <Footer/>
      </FooterContainerGrid>
    </Fragment>
  );
};

export default lifecycle({
  componentDidMount() {
    window.scrollTo(0, 0);
  }
})(TermsAndConditions);

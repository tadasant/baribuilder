import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import withAdAnalytics from "./hoc/withAdAnalytics";
import withVisibilityTracker from "./hoc/withVisibilityTracker";

const VitaminsBypassForm = ({
	trackSubscribeClick,
	trackSubscribeHover,
	trackEmailOnBlur,
	trackEmailOnFocus,
}) => (
	<React.Fragment>
		<Helmet>
			<script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
		</Helmet>
		<form
			action="https://app.convertkit.com/forms/1315948/subscriptions"
			className="seva-form formkit-form"
			method="post"
			data-sv-form={1315948}
			data-uid="b04ccb026e"
			data-version={5}
			data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Form submitted! Check your email to find your regimen.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://convertkit.com?utm_source=dynamic&utm_medium=referral&utm_campaign=poweredby&utm_content=form"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
			min-width="400 500 600 700 800"
			style={{ backgroundColor: "rgb(255, 255, 255)", borderRadius: 6 }}
		>
			<div data-style="full">
				<div
					data-element="column"
					className="formkit-column"
					style={{ backgroundColor: "rgb(249, 250, 251)" }}
				>
					<div className="formkit-background" style={{ opacity: "0.3" }} />
					<div
						className="formkit-header"
						data-element="header"
						style={{ color: "rgb(77, 77, 77)", fontSize: 20, fontWeight: 700 }}
					>
						<h1>
							Are you <strong>overpaying</strong> for gastric bypass vitamins?
						</h1>
					</div>
					<div
						className="formkit-subheader"
						data-element="subheader"
						style={{ color: "rgb(104, 104, 104)", fontSize: 15 }}
					>
						<p>
							We combed through the internet to find the cheapest set of vitamin
							products that fulfill your needs.
						</p>
					</div>
					<div className="formkit-image formkit-image relative">
						<img
							className="cursor-pointer focus:outline-blue "
							src="https://images.unsplash.com/photo-1522335579687-9c718c5184d7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjExODA0N30&utm_source=convertkit&utm_medium=referral&utm_campaign=api-credit?fit=max&w=800"
							alt
							style={{ maxWidth: "100%" }}
						/>
					</div>
				</div>
				<div data-element="column" className="formkit-column">
					<ul
						className="formkit-alert formkit-alert-error"
						data-element="errors"
						data-group="alert"
					/>
					<div data-element="fields" className="seva-fields formkit-fields">
						<div className="formkit-field">
							<input
								className="formkit-input"
								aria-label="Your first name"
								name="fields[first_name]"
								placeholder="Your first name"
								type="text"
								style={{
									color: "rgb(0, 0, 0)",
									borderColor: "rgb(227, 227, 227)",
									borderRadius: 4,
									fontWeight: 400,
								}}
							/>
						</div>
						<div className="formkit-field">
							<input
								onFocus={trackEmailOnFocus}
								onBlur={(event) => trackEmailOnBlur(event.currentTarget.value)}
								className="formkit-input"
								name="email_address"
								placeholder="Your email address"
								required
								type="email"
								style={{
									color: "rgb(0, 0, 0)",
									borderColor: "rgb(227, 227, 227)",
									borderRadius: 4,
									fontWeight: 400,
								}}
							/>
						</div>
						<button
							onMouseOver={trackSubscribeHover}
							onClick={trackSubscribeClick}
							data-element="submit"
							className="formkit-submit formkit-submit"
							style={{
								color: "rgb(255, 255, 255)",
								backgroundColor: "rgb(22, 119, 190)",
								borderRadius: 24,
								fontWeight: 700,
							}}
						>
							<div className="formkit-spinner">
								<div />
								<div />
								<div />
							</div>
							<span>Send me the regimen</span>
						</button>
					</div>
					<div
						className="formkit-guarantee"
						data-element="guarantee"
						style={{ color: "rgb(77, 77, 77)", fontSize: 13, fontWeight: 400 }}
					>
						We respect your privacy. Unsubscribe at any time.
					</div>
				</div>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html:
						'.formkit-form[data-uid="b04ccb026e"] *{box-sizing:border-box;}.formkit-form[data-uid="b04ccb026e"]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}.formkit-form[data-uid="b04ccb026e"] legend{border:none;font-size:inherit;margin-bottom:10px;padding:0;position:relative;display:table;}.formkit-form[data-uid="b04ccb026e"] fieldset{border:0;padding:0.01em 0 0 0;margin:0;min-width:0;}.formkit-form[data-uid="b04ccb026e"] body:not(:-moz-handler-blocked) fieldset{display:table-cell;}.formkit-form[data-uid="b04ccb026e"] h1,.formkit-form[data-uid="b04ccb026e"] h2,.formkit-form[data-uid="b04ccb026e"] h3,.formkit-form[data-uid="b04ccb026e"] h4,.formkit-form[data-uid="b04ccb026e"] h5,.formkit-form[data-uid="b04ccb026e"] h6{color:inherit;font-size:inherit;font-weight:inherit;}.formkit-form[data-uid="b04ccb026e"] p{color:inherit;font-size:inherit;font-weight:inherit;}.formkit-form[data-uid="b04ccb026e"] ol:not([template-default]),.formkit-form[data-uid="b04ccb026e"] ul:not([template-default]),.formkit-form[data-uid="b04ccb026e"] blockquote:not([template-default]){text-align:left;}.formkit-form[data-uid="b04ccb026e"] p:not([template-default]),.formkit-form[data-uid="b04ccb026e"] hr:not([template-default]),.formkit-form[data-uid="b04ccb026e"] blockquote:not([template-default]),.formkit-form[data-uid="b04ccb026e"] ol:not([template-default]),.formkit-form[data-uid="b04ccb026e"] ul:not([template-default]){color:inherit;font-style:initial;}.formkit-form[data-uid="b04ccb026e"][data-format="modal"]{display:none;}.formkit-form[data-uid="b04ccb026e"][data-format="slide in"]{display:none;}.formkit-form[data-uid="b04ccb026e"] .formkit-input,.formkit-form[data-uid="b04ccb026e"] .formkit-select,.formkit-form[data-uid="b04ccb026e"] .formkit-checkboxes{width:100%;}.formkit-form[data-uid="b04ccb026e"] .formkit-button,.formkit-form[data-uid="b04ccb026e"] .formkit-submit{border:0;border-radius:5px;color:#ffffff;cursor:pointer;display:inline-block;text-align:center;font-size:15px;font-weight:500;cursor:pointer;margin-bottom:15px;overflow:hidden;padding:0;position:relative;vertical-align:middle;}.formkit-form[data-uid="b04ccb026e"] .formkit-button:hover,.formkit-form[data-uid="b04ccb026e"] .formkit-submit:hover,.formkit-form[data-uid="b04ccb026e"] .formkit-button:focus,.formkit-form[data-uid="b04ccb026e"] .formkit-submit:focus{outline:none;}.formkit-form[data-uid="b04ccb026e"] .formkit-button:hover > span,.formkit-form[data-uid="b04ccb026e"] .formkit-submit:hover > span,.formkit-form[data-uid="b04ccb026e"] .formkit-button:focus > span,.formkit-form[data-uid="b04ccb026e"] .formkit-submit:focus > span{background-color:rgba(0,0,0,0.1);}.formkit-form[data-uid="b04ccb026e"] .formkit-button > span,.formkit-form[data-uid="b04ccb026e"] .formkit-submit > span{display:block;-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out;padding:12px 24px;}.formkit-form[data-uid="b04ccb026e"] .formkit-input{background:#ffffff;font-size:15px;padding:12px;border:1px solid #e3e3e3;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;line-height:1.4;margin:0;-webkit-transition:border-color ease-out 300ms;transition:border-color ease-out 300ms;}.formkit-form[data-uid="b04ccb026e"] .formkit-input:focus{outline:none;border-color:#1677be;-webkit-transition:border-color ease 300ms;transition:border-color ease 300ms;}.formkit-form[data-uid="b04ccb026e"] .formkit-input::-webkit-input-placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="b04ccb026e"] .formkit-input::-moz-placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="b04ccb026e"] .formkit-input:-ms-input-placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="b04ccb026e"] .formkit-input::placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="b04ccb026e"] [data-group="dropdown"]{position:relative;display:inline-block;width:100%;}.formkit-form[data-uid="b04ccb026e"] [data-group="dropdown"]::before{content:"";top:calc(50% - 2.5px);right:10px;position:absolute;pointer-events:none;border-color:#4f4f4f transparent transparent transparent;border-style:solid;border-width:6px 6px 0 6px;height:0;width:0;z-index:999;}.formkit-form[data-uid="b04ccb026e"] [data-group="dropdown"] select{height:auto;width:100%;cursor:pointer;color:#333333;line-height:1.4;margin-bottom:0;padding:0 6px;-webkit-appearance:none;-moz-appearance:none;appearance:none;font-size:15px;padding:12px;padding-right:25px;border:1px solid #e3e3e3;background:#ffffff;}.formkit-form[data-uid="b04ccb026e"] [data-group="dropdown"] select:focus{outline:none;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"]{text-align:left;margin:0;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"]{margin-bottom:10px;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] *{cursor:pointer;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"]:last-of-type{margin-bottom:0;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] input[type="checkbox"]{display:none;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] input[type="checkbox"] + label::after{content:none;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] input[type="checkbox"]:checked + label::after{border-color:#ffffff;content:"";}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] input[type="checkbox"]:checked + label::before{background:#10bf7a;border-color:#10bf7a;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] label{position:relative;display:inline-block;padding-left:28px;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] label::before,.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] label::after{position:absolute;content:"";display:inline-block;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] label::before{height:16px;width:16px;border:1px solid #e3e3e3;background:#ffffff;left:0px;top:3px;}.formkit-form[data-uid="b04ccb026e"] [data-group="checkboxes"] [data-group="checkbox"] label::after{height:4px;width:8px;border-left:2px solid #4d4d4d;border-bottom:2px solid #4d4d4d;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);left:4px;top:8px;}.formkit-form[data-uid="b04ccb026e"] .formkit-alert{background:#f9fafb;border:1px solid #e3e3e3;border-radius:5px;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;list-style:none;margin:25px auto;padding:12px;text-align:center;width:100%;}.formkit-form[data-uid="b04ccb026e"] .formkit-alert:empty{display:none;}.formkit-form[data-uid="b04ccb026e"] .formkit-alert-success{background:#d3fbeb;border-color:#10bf7a;color:#0c905c;}.formkit-form[data-uid="b04ccb026e"] .formkit-alert-error{background:#fde8e2;border-color:#f2643b;color:#ea4110;}.formkit-form[data-uid="b04ccb026e"] .formkit-spinner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:0px;width:0px;margin:0 auto;position:absolute;top:0;left:0;right:0;width:0px;overflow:hidden;text-align:center;-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out;}.formkit-form[data-uid="b04ccb026e"] .formkit-spinner > div{margin:auto;width:12px;height:12px;background-color:#fff;opacity:0.3;border-radius:100%;display:inline-block;-webkit-animation:formkit-bouncedelay-formkit-form-data-uid-b04ccb026e- 1.4s infinite ease-in-out both;animation:formkit-bouncedelay-formkit-form-data-uid-b04ccb026e- 1.4s infinite ease-in-out both;}.formkit-form[data-uid="b04ccb026e"] .formkit-spinner > div:nth-child(1){-webkit-animation-delay:-0.32s;animation-delay:-0.32s;}.formkit-form[data-uid="b04ccb026e"] .formkit-spinner > div:nth-child(2){-webkit-animation-delay:-0.16s;animation-delay:-0.16s;}.formkit-form[data-uid="b04ccb026e"] .formkit-submit[data-active] .formkit-spinner{opacity:1;height:100%;width:50px;}.formkit-form[data-uid="b04ccb026e"] .formkit-submit[data-active] .formkit-spinner ~ span{opacity:0;}.formkit-form[data-uid="b04ccb026e"] .formkit-powered-by[data-active="false"]{opacity:0.35;}@-webkit-keyframes formkit-bouncedelay-formkit-form-data-uid-b04ccb026e-{0%,80%,100%{-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);}40%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}}@keyframes formkit-bouncedelay-formkit-form-data-uid-b04ccb026e-{0%,80%,100%{-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);}40%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}}.formkit-form[data-uid="b04ccb026e"] blockquote{padding:10px 20px;margin:0 0 20px;border-left:5px solid #e1e1e1;} .formkit-form[data-uid="b04ccb026e"]{box-shadow:0 2px 15px 0 rgba(210,214,220,0.5);max-width:700px;overflow:hidden;}.formkit-form[data-uid="b04ccb026e"] [data-style="full"]{width:100%;display:block;}.formkit-form[data-uid="b04ccb026e"] .formkit-header{margin-top:0;margin-bottom:20px;}.formkit-form[data-uid="b04ccb026e"] .formkit-subheader{margin:15px 0;}.formkit-form[data-uid="b04ccb026e"] .formkit-column{padding:20px;position:relative;}.formkit-form[data-uid="b04ccb026e"] .formkit-column:nth-child(2){border-top:1px solid #e9ecef;}.formkit-form[data-uid="b04ccb026e"] .formkit-background{width:100%;height:100%;position:absolute;top:0;left:0;background-size:cover;background-position:center;opacity:0.5;z-index:1;}.formkit-form[data-uid="b04ccb026e"] .formkit-header,.formkit-form[data-uid="b04ccb026e"] .formkit-subheader,.formkit-form[data-uid="b04ccb026e"] .formkit-image{z-index:2;position:relative;}.formkit-form[data-uid="b04ccb026e"] .formkit-field{margin:0 0 15px 0;}.formkit-form[data-uid="b04ccb026e"] .formkit-input,.formkit-form[data-uid="b04ccb026e"] .formkit-submit{width:100%;}.formkit-form[data-uid="b04ccb026e"] .formkit-guarantee{font-size:13px;margin:0 0 15px 0;}.formkit-form[data-uid="b04ccb026e"] .formkit-guarantee > p{margin:0;}.formkit-form[data-uid="b04ccb026e"] .formkit-powered-by{color:#7d7d7d;display:block;font-size:12px;margin-bottom:0;}.formkit-form[data-uid="b04ccb026e"][min-width~="600"] [data-style="full"],.formkit-form[data-uid="b04ccb026e"][min-width~="700"] [data-style="full"],.formkit-form[data-uid="b04ccb026e"][min-width~="800"] [data-style="full"]{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));}.formkit-form[data-uid="b04ccb026e"][min-width~="600"] .formkit-submit,.formkit-form[data-uid="b04ccb026e"][min-width~="700"] .formkit-submit,.formkit-form[data-uid="b04ccb026e"][min-width~="800"] .formkit-submit{width:100%;}.formkit-form[data-uid="b04ccb026e"][min-width~="600"] .formkit-column,.formkit-form[data-uid="b04ccb026e"][min-width~="700"] .formkit-column,.formkit-form[data-uid="b04ccb026e"][min-width~="800"] .formkit-column{padding:40px;}.formkit-form[data-uid="b04ccb026e"][min-width~="600"] .formkit-column:nth-child(2),.formkit-form[data-uid="b04ccb026e"][min-width~="700"] .formkit-column:nth-child(2),.formkit-form[data-uid="b04ccb026e"][min-width~="800"] .formkit-column:nth-child(2){border-top:none;} ',
				}}
			/>
		</form>
	</React.Fragment>
);

VitaminsBypassForm.propTypes = {
	trackSubscribeClick: PropTypes.func,
	trackSubscribeHover: PropTypes.func,
	trackEmailOnFocus: PropTypes.func,
	trackEmailOnBlur: PropTypes.func,
};

export default withVisibilityTracker(
	withAdAnalytics(VitaminsBypassForm, {
		adContent: "bypass_vitamins_overpaying_calculator",
	})
);

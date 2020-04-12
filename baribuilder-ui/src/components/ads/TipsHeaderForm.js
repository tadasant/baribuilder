import React from "react";
import Helmet from "react-helmet";

const TipsHeaderForm = () => (
	<React.Fragment>
		<Helmet>
			<script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
		</Helmet>
		<form
			action="https://app.convertkit.com/forms/1228954/subscriptions"
			className="seva-form formkit-form"
			method="post"
			data-sv-form={1228954}
			data-uid="8d24965d04"
			data-format="inline"
			data-version={5}
			data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://convertkit.com?utm_source=dynamic&utm_medium=referral&utm_campaign=poweredby&utm_content=form"},"recaptcha":{"enabled":false},"return_visitor":{"action":"hide","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
			min-width="400 500 600 700 800"
			style={{ backgroundColor: "rgb(249, 250, 251)", borderRadius: 4 }}
		>
			<div className="formkit-background" style={{ opacity: "0.2" }} />
			<div data-style="minimal">
				<div
					className="formkit-header"
					data-element="header"
					style={{ color: "rgb(77, 77, 77)", fontSize: 27, fontWeight: 700 }}
				>
					<h1>Like what you're reading?</h1>
				</div>
				<div
					className="formkit-subheader"
					data-element="subheader"
					style={{ color: "rgb(104, 104, 104)", fontSize: 18 }}
				>
					<p>Get weekly tips like this delivered to your inbox.</p>
				</div>
				<ul
					className="formkit-alert formkit-alert-error"
					data-element="errors"
					data-group="alert"
				/>
				<div
					data-element="fields"
					data-stacked="false"
					className="seva-fields formkit-fields"
				>
					<div className="formkit-field">
						<input
							className="formkit-input"
							name="email_address"
							placeholder="Your email address"
							required
							type="email"
							style={{
								color: "rgb(0, 0, 0)",
								borderColor: "rgb(227, 227, 227)",
								borderRadius: 4,
								fontWeight: 400
							}}
						/>
					</div>
					<button
						data-element="submit"
						className="formkit-submit formkit-submit"
						style={{
							color: "rgb(255, 255, 255)",
							backgroundColor: "rgb(22, 119, 190)",
							borderRadius: 4,
							fontWeight: 400
						}}
					>
						<div className="formkit-spinner">
							<div />
							<div />
							<div />
						</div>
						<span>Subscribe</span>
					</button>
				</div>
				<div
					className="formkit-guarantee"
					data-element="guarantee"
					style={{ color: "rgb(77, 77, 77)", fontSize: 13, fontWeight: 400 }}
				>
					We won't send you spam. Unsubscribe at any time.
				</div>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html:
						'.formkit-form[data-uid="8d24965d04"] *{box-sizing:border-box;}.formkit-form[data-uid="8d24965d04"]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}.formkit-form[data-uid="8d24965d04"] legend{border:none;font-size:inherit;margin-bottom:10px;padding:0;position:relative;display:table;}.formkit-form[data-uid="8d24965d04"] fieldset{border:0;padding:0.01em 0 0 0;margin:0;min-width:0;}.formkit-form[data-uid="8d24965d04"] body:not(:-moz-handler-blocked) fieldset{display:table-cell;}.formkit-form[data-uid="8d24965d04"] h1,.formkit-form[data-uid="8d24965d04"] h2,.formkit-form[data-uid="8d24965d04"] h3,.formkit-form[data-uid="8d24965d04"] h4,.formkit-form[data-uid="8d24965d04"] h5,.formkit-form[data-uid="8d24965d04"] h6{color:inherit;font-size:inherit;font-weight:inherit;}.formkit-form[data-uid="8d24965d04"] p{color:inherit;font-size:inherit;font-weight:inherit;}.formkit-form[data-uid="8d24965d04"] ol:not([template-default]),.formkit-form[data-uid="8d24965d04"] ul:not([template-default]),.formkit-form[data-uid="8d24965d04"] blockquote:not([template-default]){text-align:left;}.formkit-form[data-uid="8d24965d04"] p:not([template-default]),.formkit-form[data-uid="8d24965d04"] hr:not([template-default]),.formkit-form[data-uid="8d24965d04"] blockquote:not([template-default]),.formkit-form[data-uid="8d24965d04"] ol:not([template-default]),.formkit-form[data-uid="8d24965d04"] ul:not([template-default]){color:inherit;font-style:initial;}.formkit-form[data-uid="8d24965d04"][data-format="modal"]{display:none;}.formkit-form[data-uid="8d24965d04"][data-format="slide in"]{display:none;}.formkit-form[data-uid="8d24965d04"] .formkit-input,.formkit-form[data-uid="8d24965d04"] .formkit-select,.formkit-form[data-uid="8d24965d04"] .formkit-checkboxes{width:100%;}.formkit-form[data-uid="8d24965d04"] .formkit-button,.formkit-form[data-uid="8d24965d04"] .formkit-submit{border:0;border-radius:5px;color:#ffffff;cursor:pointer;display:inline-block;text-align:center;font-size:15px;font-weight:500;cursor:pointer;margin-bottom:15px;overflow:hidden;padding:0;position:relative;vertical-align:middle;}.formkit-form[data-uid="8d24965d04"] .formkit-button:hover,.formkit-form[data-uid="8d24965d04"] .formkit-submit:hover,.formkit-form[data-uid="8d24965d04"] .formkit-button:focus,.formkit-form[data-uid="8d24965d04"] .formkit-submit:focus{outline:none;}.formkit-form[data-uid="8d24965d04"] .formkit-button:hover > span,.formkit-form[data-uid="8d24965d04"] .formkit-submit:hover > span,.formkit-form[data-uid="8d24965d04"] .formkit-button:focus > span,.formkit-form[data-uid="8d24965d04"] .formkit-submit:focus > span{background-color:rgba(0,0,0,0.1);}.formkit-form[data-uid="8d24965d04"] .formkit-button > span,.formkit-form[data-uid="8d24965d04"] .formkit-submit > span{display:block;-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out;padding:12px 24px;}.formkit-form[data-uid="8d24965d04"] .formkit-input{background:#ffffff;font-size:15px;padding:12px;border:1px solid #e3e3e3;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;line-height:1.4;margin:0;-webkit-transition:border-color ease-out 300ms;transition:border-color ease-out 300ms;}.formkit-form[data-uid="8d24965d04"] .formkit-input:focus{outline:none;border-color:#1677be;-webkit-transition:border-color ease 300ms;transition:border-color ease 300ms;}.formkit-form[data-uid="8d24965d04"] .formkit-input::-webkit-input-placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="8d24965d04"] .formkit-input::-moz-placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="8d24965d04"] .formkit-input:-ms-input-placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="8d24965d04"] .formkit-input::placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="8d24965d04"] [data-group="dropdown"]{position:relative;display:inline-block;width:100%;}.formkit-form[data-uid="8d24965d04"] [data-group="dropdown"]::before{content:"";top:calc(50% - 2.5px);right:10px;position:absolute;pointer-events:none;border-color:#4f4f4f transparent transparent transparent;border-style:solid;border-width:6px 6px 0 6px;height:0;width:0;z-index:999;}.formkit-form[data-uid="8d24965d04"] [data-group="dropdown"] select{height:auto;width:100%;cursor:pointer;color:#333333;line-height:1.4;margin-bottom:0;padding:0 6px;-webkit-appearance:none;-moz-appearance:none;appearance:none;font-size:15px;padding:12px;padding-right:25px;border:1px solid #e3e3e3;background:#ffffff;}.formkit-form[data-uid="8d24965d04"] [data-group="dropdown"] select:focus{outline:none;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"]{text-align:left;margin:0;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"]{margin-bottom:10px;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] *{cursor:pointer;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"]:last-of-type{margin-bottom:0;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] input[type="checkbox"]{display:none;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] input[type="checkbox"] + label::after{content:none;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] input[type="checkbox"]:checked + label::after{border-color:#ffffff;content:"";}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] input[type="checkbox"]:checked + label::before{background:#10bf7a;border-color:#10bf7a;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] label{position:relative;display:inline-block;padding-left:28px;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] label::before,.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] label::after{position:absolute;content:"";display:inline-block;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] label::before{height:16px;width:16px;border:1px solid #e3e3e3;background:#ffffff;left:0px;top:3px;}.formkit-form[data-uid="8d24965d04"] [data-group="checkboxes"] [data-group="checkbox"] label::after{height:4px;width:8px;border-left:2px solid #4d4d4d;border-bottom:2px solid #4d4d4d;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);left:4px;top:8px;}.formkit-form[data-uid="8d24965d04"] .formkit-alert{background:#f9fafb;border:1px solid #e3e3e3;border-radius:5px;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;list-style:none;margin:25px auto;padding:12px;text-align:center;width:100%;}.formkit-form[data-uid="8d24965d04"] .formkit-alert:empty{display:none;}.formkit-form[data-uid="8d24965d04"] .formkit-alert-success{background:#d3fbeb;border-color:#10bf7a;color:#0c905c;}.formkit-form[data-uid="8d24965d04"] .formkit-alert-error{background:#fde8e2;border-color:#f2643b;color:#ea4110;}.formkit-form[data-uid="8d24965d04"] .formkit-spinner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:0px;width:0px;margin:0 auto;position:absolute;top:0;left:0;right:0;width:0px;overflow:hidden;text-align:center;-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out;}.formkit-form[data-uid="8d24965d04"] .formkit-spinner > div{margin:auto;width:12px;height:12px;background-color:#fff;opacity:0.3;border-radius:100%;display:inline-block;-webkit-animation:formkit-bouncedelay-formkit-form-data-uid-8d24965d04- 1.4s infinite ease-in-out both;animation:formkit-bouncedelay-formkit-form-data-uid-8d24965d04- 1.4s infinite ease-in-out both;}.formkit-form[data-uid="8d24965d04"] .formkit-spinner > div:nth-child(1){-webkit-animation-delay:-0.32s;animation-delay:-0.32s;}.formkit-form[data-uid="8d24965d04"] .formkit-spinner > div:nth-child(2){-webkit-animation-delay:-0.16s;animation-delay:-0.16s;}.formkit-form[data-uid="8d24965d04"] .formkit-submit[data-active] .formkit-spinner{opacity:1;height:100%;width:50px;}.formkit-form[data-uid="8d24965d04"] .formkit-submit[data-active] .formkit-spinner ~ span{opacity:0;}.formkit-form[data-uid="8d24965d04"] .formkit-powered-by[data-active="false"]{opacity:0.35;}@-webkit-keyframes formkit-bouncedelay-formkit-form-data-uid-8d24965d04-{0%,80%,100%{-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);}40%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}}@keyframes formkit-bouncedelay-formkit-form-data-uid-8d24965d04-{0%,80%,100%{-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);}40%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}}.formkit-form[data-uid="8d24965d04"] blockquote{padding:10px 20px;margin:0 0 20px;border-left:5px solid #e1e1e1;} .formkit-form[data-uid="8d24965d04"]{border:1px solid #e3e3e3;max-width:700px;position:relative;overflow:hidden;}.formkit-form[data-uid="8d24965d04"] .formkit-background{width:100%;height:100%;position:absolute;top:0;left:0;background-size:cover;background-position:center;opacity:0.3;z-index:1;}.formkit-form[data-uid="8d24965d04"] [data-style="minimal"]{padding:20px;width:100%;z-index:2;position:relative;}.formkit-form[data-uid="8d24965d04"] .formkit-header{margin:0 0 27px 0;text-align:center;}.formkit-form[data-uid="8d24965d04"] .formkit-subheader{margin:18px 0;text-align:center;}.formkit-form[data-uid="8d24965d04"] .formkit-guarantee{font-size:13px;margin:10px 0 15px 0;text-align:center;}.formkit-form[data-uid="8d24965d04"] .formkit-guarantee > p{margin:0;}.formkit-form[data-uid="8d24965d04"] .formkit-powered-by{color:#7d7d7d;display:block;font-size:12px;margin:10px 0 0 0;text-align:center;}.formkit-form[data-uid="8d24965d04"] .formkit-fields{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:25px auto 0 auto;}.formkit-form[data-uid="8d24965d04"] .formkit-field{min-width:220px;}.formkit-form[data-uid="8d24965d04"] .formkit-field,.formkit-form[data-uid="8d24965d04"] .formkit-submit{margin:0 0 15px 0;-webkit-flex:1 0 100%;-ms-flex:1 0 100%;flex:1 0 100%;}.formkit-form[data-uid="8d24965d04"][min-width~="600"] [data-style="minimal"]{padding:40px;}.formkit-form[data-uid="8d24965d04"][min-width~="600"] .formkit-fields[data-stacked="false"]{margin-left:-5px;margin-right:-5px;}.formkit-form[data-uid="8d24965d04"][min-width~="600"] .formkit-fields[data-stacked="false"] .formkit-field,.formkit-form[data-uid="8d24965d04"][min-width~="600"] .formkit-fields[data-stacked="false"] .formkit-submit{margin:0 5px 15px 5px;}.formkit-form[data-uid="8d24965d04"][min-width~="600"] .formkit-fields[data-stacked="false"] .formkit-field{-webkit-flex:100 1 auto;-ms-flex:100 1 auto;flex:100 1 auto;}.formkit-form[data-uid="8d24965d04"][min-width~="600"] .formkit-fields[data-stacked="false"] .formkit-submit{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;} '
				}}
			/>
		</form>
	</React.Fragment>
);

export default TipsHeaderForm;

<template>
	<div class="all">
		<div class="form-wrapper">
			<main class="form-side">
				<form class="my-form">
					<div class="form-welcome-row">
						<h1>Get started</h1>
						<h2>Create a new account</h2>
					</div>
					<!-- <div class="socials-row">
                        <a href="#" title="Use Google">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                            </svg>
                            Continue with Github
                        </a>
                    </div>
                    <div class="divider">
                        <div class="divider-line"></div>
                        or
                        <div class="divider-line"></div>
                    </div> -->
					<div class="text-field">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							autocomplete="off"
							placeholder="you@example.com"
							required
						/>
						<div class="error-message">Email in incorrect format</div>
					</div>
					<div class="text-field">
						<label for="password">Password</label>
						<input
							id="password"
							type="password"
							name="password"
							placeholder="Your password"
							title="Minimum 6 characters at 
                                                        least 1 Alphabet and 1 Number"
							pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
							required
						/>
						<div class="error-message">
							Minimum 6 characters at least 1 Alphabet and 1 Number
						</div>
					</div>
					<button class="my-form__button" type="submit">Sign up</button>
					<div class="my-form__actions">
						<div class="my-form__row">
							<span>Have an account?</span>
							<a href="#" title="Reset Password"> Sign In Now </a>
						</div>
					</div>
				</form>
			</main>
			<aside class="info-side">
				<div class="blockquote-wrapper">
					<blockquote>
						Working with Supabase is just fun. It makes working with a DB so
						much easier.
					</blockquote>
				</div>
			</aside>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

*::selection {
	background-color: var(--primary-light);
}

.socials-row {
	display: flex;
}

.socials-row img {
	width: 1.5rem;
	height: 1.5rem;
}

.socials-row > a {
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 100%;
	min-height: 2.75rem;
	display: flex;
	gap: 0.75rem;
	color: var(--text);
	justify-content: center;
	align-items: center;
	text-decoration: none;
	font-size: 1.1rem;
	color: var(--text);
	padding: 0.5rem;
	border: 1px solid var(--border);
	transition: all 0.3s ease;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 4px 0px;
}

.socials-row > a svg {
	color: var(--text);
}

.socials-row > a:hover {
	background-color: var(--btn-bg);
}

.form-welcome-row {
	margin-bottom: 1rem;
}

.form-welcome-row h1 {
	color: var(--text);
	font-size: 2rem;
	line-height: 2rem;
	font-weight: normal;
	margin-top: 2rem;
	margin-bottom: 0.75rem;
}

.form-welcome-row h2 {
	color: var(--text-gray);
	font-size: 1.1rem;
	font-weight: normal;
}

.divider {
	display: flex;
	flex-direction: row;
	color: var(--secondary);
	gap: 1rem;
	align-items: center;
}

.divider-line {
	width: 100%;
	height: 1px;
	background-color: var(--secondary);
	opacity: 0.2;
}

.form-wrapper {
	position: relative;
	display: grid;
	grid-template-columns: 6fr 5fr;
	margin: 0 auto;
	height: 100%;
}

.form-side {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 2rem;
	background-color: var(--main-side-background);
	box-shadow: rgba(99, 99, 99, 0.1) 3px 2px 2px -1px;
}

.logo {
	height: 1.5rem;
	position: absolute;
	top: 1.5rem;
	left: 1.5rem;
}

.my-form {
	display: flex;
	flex-direction: column;
	justify-content: start;
	position: relative;
	gap: 1.25rem;
	max-width: 23rem;
	width: 100%;
}

.my-form__button {
	background-color: var(--primary);
	border: 1px solid var(--primary-light);
	color: white;
	white-space: nowrap;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1.5rem;
	line-height: 2.75rem;
	outline: none;
	font-size: 1.125rem;
	text-decoration: none;
	cursor: pointer;
	width: 100%;
	border-radius: 0.5rem;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease;
}

.my-form:invalid .my-form__button {
	pointer-events: none;
	background-color: var(--primary-disabled);
	border: 1px solid var(--primary-light);
}

.my-form__actions {
	display: flex;
	flex-direction: column;
	color: var(--secondary);
	gap: 1rem;
	margin-top: 0.5rem;
}

.my-form__actions a {
	color: var(--text);
}

.my-form__actions a:hover {
	color: var(--text-gray);
	text-decoration: underline;
}

.my-form__row {
	display: flex;
	justify-content: center;
	gap: 1rem;
}

.text-field {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.text-field input {
	color: var(--secondary);
	max-width: 100%;
	width: 100%;
	border: 1px solid var(--border);
	min-height: 2.75rem;
	letter-spacing: 0.03rem;
	outline: none;
	background-color: var(--input-bg);
	transition: 0.25s;
	border-radius: 0.5rem;
	text-indent: 1.25rem;
}

.text-field label {
	color: var(--text-gray);
}

.text-field input:user-invalid {
	background-color: var(--white);
	color: var(--error);
	border: 1px solid var(--error);
}

.error-message {
	display: none;
}

.text-field input:user-invalid ~ .error-message {
	display: block;
	margin-top: 0.25rem;
	font-size: 0.8rem;
	color: var(--error);
}

.text-field input:focus {
	border: 1px solid var(--text);
	box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 4px 0px;
}

/* aside */
.info-side {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 3rem;
}

.info-side .blockquote-wrapper {
	gap: 1rem;
	position: relative;
}

.info-side .blockquote-wrapper blockquote {
	margin-bottom: 1rem;
	max-width: 30rem;
	width: 100%;
	font-size: 1.25rem;
	line-height: 2.25rem;
}

.info-side .blockquote-wrapper blockquote::before {
	content: open-quote;
	font-size: 4rem;
	line-height: 0;
	margin-right: 0.5rem;
	position: absolute;
	left: -1.5rem;
}

.info-side .author {
	display: flex;
	flex-direction: row;
	gap: 0.75rem;
	align-items: center;
}

.info-side .author img {
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
}

.info-side .author-name {
	font-size: 1.125rem;
	line-height: 1.75rem;
	font-weight: 600;
	color: var(--text-gray);
}

@media (max-width: 720px) {
	.form-wrapper {
		grid-template-columns: 1fr;
		height: 100vh;
	}

	.info-side {
		display: none;
	}
}
</style>

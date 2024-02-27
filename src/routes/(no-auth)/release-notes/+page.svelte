<div class="flex flex-col gap-10 p-2">
	<div class="flex flex-col">
		<div class="date">Feb 26, 2024</div>
		<ul>
			<header>Added phone verification</header>
			<div>
				<li>Phone verification via text message and UI input has been added</li>
				<li>If a user modifies their phone number, this will un-verify their phone number. (db)</li>
				<li>
					If any verification is in progress (A verification code has already been sent), that
					verification will be cancelled. (db)
				</li>
				<li>
					If a user attempts phone verification but their phone number is already verified, they
					will be redirected to their profile page and their phone will be marked as verified.
				</li>
			</div>
		</ul>
	</div>

	<!-- <div class="flex flex-col">
		<div class="date">Feb 26, 2024</div>
		<ul>
			<li>If a user modifies their phone number, this will un-verify their phone number.</li>
			<li>
				If any verification is in progress (A verification code has already been sent), that
				verification will be cancelled.
			</li>
			<li>Phone verification via text message and UI input has been added</li>
			<li>
				If a user's phone number is already verified, they will be redirected to their profile page
				and their phone will be marked as verified.
			</li>
		</ul>
	</div> -->
</div>

<style lang="postcss">
	.date {
		@apply font-bold text-center py-2;
	}
	ul {
		@apply flex flex-col gap-2;
	}
	ul > header {
		@apply underline;
	}
	ul > div > li {
		list-style: circle;
		list-style-position: outside;
		@apply ml-5;
	}
</style>

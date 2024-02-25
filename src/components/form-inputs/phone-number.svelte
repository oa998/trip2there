<script lang="ts">
	import isLoading from '$stores/loading';
	export let phoneNumber: string = '';
	export let disabled = false;
	let valid: null | boolean = null;
	const isValidRE = '^\\d\\d\\d-\\d\\d\\d-\\d\\d\\d\\d$';

	async function isValid(phoneNum: string) {
		if (phoneNum) {
			valid = new RegExp(isValidRE).test(phoneNum);
		} else {
			valid = null;
		}
	}

	$: {
		// if some digits are provided, reformat those digits
		if (/\d/.test(phoneNumber)) {
			// remove all non-digits and group them
			const matches = /^(\d{1,3})(\d{0,3})(\d{0,4})/.exec(phoneNumber.replace(/\D/g, ''));
			if (matches?.[3]) {
				phoneNumber = `${matches[1]}-${matches[2]}-${matches[3]}`;
			} else if (matches?.[2]) {
				phoneNumber = `${matches[1]}-${matches[2]}`;
			}
		} else {
			phoneNumber = '';
		}
		isValid(phoneNumber);
	}
</script>

<div class="flex flex-col justify-end w-full">
	<div class="flex flex-row">
		<div class="self-center border border-black bg-gray-300 text-gray-600 rounded-l h-full p-1">
			+1
		</div>
		<input
			name="phone"
			id="phone"
			type="text"
			on:input={async (e) => {
				if (e.inputType == 'deleteContentBackward' && /-$/.test(phoneNumber)) {
					phoneNumber = phoneNumber.split('').slice(0, -2).join('');
				}
			}}
			disabled={$isLoading || disabled}
			bind:value={phoneNumber}
			required
			title={`Area code and phone number. example: 731-555-5555`}
			pattern={isValidRE}
			class="w-full"
			maxlength="12"
		/>
	</div>
	<label for="phone">
		<span>Phone number</span>
		{#if valid != null && !valid}
			<span class="italic text-red-600"> (invalid)</span>
		{/if}
	</label>
</div>

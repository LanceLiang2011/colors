import type { PageServerLoad } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';
import type { Actions } from '@sveltejs/kit';

function isValidHexColor(hex: string) {
	return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const openai = new OpenAI({
			apiKey: OPENAI_API_KEY
		});

		const data = await request.formData();
		const prompt = data.get('prompt');

		const user_prompt = `
		### Instruction ###
		Based on the input human language description, generate a color palette between 3 - 8 colors that fits the vibe.
		The color palette should perfectly fit the theme of user input. For example, if the input is fire related, the output should be fire related colors like red and orange.
		If the input is a brand name, the output should be the color palette of its logo.
		Always return A JSON array of hexadecimal color codes even if the question does not make sense.

		### Expected format ###
		A JSON array of hexadecimal color codes
		["#123456", "#FFFCCC"]

		### Examples ###
		Q: The color of fire
		A: ["#801100", "#b62203", "#d73502", "#fc6400", "#ff7500", "#fac000"]

		Q: The colors of the ocean
		A: ["#0000ff", "#1e90ff", "#00bfff", "#add8e6", "#b0e0e6", "#5f9ea0"]

		Q: The colors of a forest
		A: ["#013220", "#2a623d", "#38755b", "#76b041", "#8cc084", "#b3d9a1"]

		Q: Google
		A: ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"]

		Q: ${prompt}
		A:
		`;
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: user_prompt }],
			max_tokens: 150,
			temperature: 0.7
		});
		const content = response.choices[0].message.content;

		let colorPalette;
		try {
			colorPalette = JSON.parse(content ?? '');
		} catch (error) {
			return { error: 'Failed to parse response from OpenAI.' };
		}

		if (!Array.isArray(colorPalette) || !colorPalette.every(isValidHexColor)) {
			return { error: 'Invalid color palette format received from OpenAI.' };
		}

		return { palette: colorPalette };
	}
};

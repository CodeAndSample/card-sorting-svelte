import { withAuth } from '@supabase/auth-helpers-sveltekit';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface ProjectsTable {
	id: string;
	created_at: string;
}

// this should be a post request
// In general, form actions are a better way to submit data from the browser to the server. https://kit.svelte.dev/docs/form-actions
export const POST: RequestHandler = withAuth(async ({ request, getSupabaseClient, session }) => {
	if (!session.user) {
		throw error(401, { message: 'Unauthorized' });
	}
	const { a, b } = await request.json();
	// const { data } = await getSupabaseClient().from<ProjectsTable>('projects').select('*');

	return json(a + b);
});

export const GET: RequestHandler = withAuth(async ({ getSupabaseClient, session }) => {
	if (!session.user) {
		throw error(401, { message: 'Unauthorized' });
	}
	const { data } = await getSupabaseClient().from<ProjectsTable>('projects').select('*');
	return json(data);
});

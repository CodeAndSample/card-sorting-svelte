import { withAuth } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
// import { error } from '@sveltejs/kit';

export const load: PageLoad = withAuth(async ({ params, session, getSupabaseClient }) => {
	if (!session.user) {
		throw redirect(303, '/');
	}
	const { data: tableData } = await getSupabaseClient()
		.from('surveys')
		.select('*')
		.eq('project_id', params.project_id);

	// if tableData is not null, then return the data
	// if (tableData)
	// 	if (params.project_id === tableData.id) {
	// 		return {
	// 			title: 'Hello world!',
	// 			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
	// 		};
	// 	}
	return { tableData, user: session.user };
});
import { withAuth } from '@supabase/auth-helpers-sveltekit';
import { error, invalid, redirect } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';

export const actions = {
	createProject: withAuth(async ({ session, getSupabaseClient, request }) => {
		if (!session.user) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}
		// we are save, let the user create the post
		const formData = await request.formData();
		const content = formData.get('content');
		console.log(content);
		const id: string = uuid();

		const { error: createProjectError, data: newProject } = await getSupabaseClient()
			.from('projects')
			.insert([
				{
					id: id,
					project_name: content,
					created_by: session.user.id,
					open_sort: false,
					closed_sort: false,
					description: 'string',

					organisation: 'None'
				}
			]);

		if (createProjectError) {
			return invalid(500, {
				supabaseErrorMessage: createProjectError.message
			});
		}

		throw redirect(307, '/projects/' + id);
		return {
			newProject
		};
	}),
	deleteProject: withAuth(async ({ session, getSupabaseClient, request }) => {
		if (!session.user) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}
		// we are save, let the user create the post
		const formData = await request.formData();
		const content = formData.get('content');
		console.log('Tausend');

		const { error: createProjectError, data: newProject } = await getSupabaseClient()
			.from('projects')
			.insert({ content });

		if (createProjectError) {
			return invalid(500, {
				supabaseErrorMessage: createProjectError.message
			});
		}
		return {
			newProject
		};
	})
};

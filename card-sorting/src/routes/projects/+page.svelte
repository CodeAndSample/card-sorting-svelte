<script lang=ts>
        import type { PageData } from './$types';
        export let data: PageData;
        $: ({tableData, user} = data);
</script>

<p>
	[<a href="/">Home</a>] | [<a href="/profile">withPageAuth</a>] | [<a href="/github-provider-token"
		>GitHub Token</a
	>]
</p>
<form method="POST" action="?/createProject">
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
        <input type="submit" value="Submit">
</form>

<form method="POST" action="?/deleteProject">
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
        <input type="submit" value="Submit">
</form>

<div>Protected content for {user.email}</div>
<p>server-side fetched data with RLS:</p>
{#each tableData as project}
  <p>
    <a href="/projects/{project.id}">{project.project_name}</a>
  </p>
{/each}

<pre>{JSON.stringify(tableData, null, 2)}</pre>
<p>user:</p>
<pre>{JSON.stringify(user, null, 2)}</pre>
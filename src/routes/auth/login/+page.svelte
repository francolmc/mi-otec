<script lang="ts">
    export let form;
</script>

<div class="container mx-auto mt-8">
    <form action="?/login" method="POST" class="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 class="text-2xl font-semibold mb-6">Control de acceso</h2>
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Usuario:</label>
            <input type="text" id="email" name="email" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-600">Contraseña:</label>
            <input type="password" id="password" name="password" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <div class="mb-4">
            {#if form?.invalid}
                <p class="error">Email y contraseña requeridos.</p>
            {/if}

            {#if form?.credentials}
                <p class="error">Tus credentials no son validas.</p>
            {/if}
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Ingresar</button>
    </form>
</div>


<script>
    export let data;
    export let form;
</script>

<div class="container mx-auto mt-8">
    <form class="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md" method="post">
        <h2 class="text-2xl font-semibold mb-6 text-blue-500">Registro de Nueva Empresa</h2>
        
        <div class="mb-4">
            <label for="rut" class="block text-sm font-medium text-gray-600">RUT de la Empresa</label>
            <input type="text" id="rut" name="rut" class="mt-1 p-2 w-full border rounded-md" value="{data.props.company.rut}" disabled>
        </div>

        <!-- Nombre de la Empresa -->
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Nombre de la Empresa</label>
            <input type="text" id="name" name="name" class="mt-1 p-2 w-full border rounded-md" value="{data.props.company.name}">
        </div>
        
        <!-- Dirección -->
        <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-600">Dirección</label>
            <input type="text" id="address" name="address" class="mt-1 p-2 w-full border rounded-md" value="{data.props.company.address}">
        </div>

        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" id="email" name="email" class="mt-1 p-2 w-full border rounded-md" value="{data.props.company.email}">
        </div>
        
        <!-- Otros campos del formulario -->
        
        <!-- Botón de Registro -->
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Actualizar Empresa</button>

        <div class="mb-4">
            {#if form?.invalid}
                <p class="error">Los campos no son validos.</p>
            {/if}
            {#if form?.error}
                <p class="error">{ form?.message }</p>
            {/if}
        </div>
    </form>
</div>

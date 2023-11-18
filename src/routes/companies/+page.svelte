<script lang="ts">
    import { goto } from "$app/navigation";
    export let data;

    let search = data.props.search;
    $: companies = data.props.companies;
    $: pageSize = data.props.perPage;
    $: totalItems = data.props.totalCount;
    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currentPage = data.props.currentPage;

    const handleKeydown = (event: { key: string; }) => {
        if (event.key === "Enter") {
            const query = search ? `?search=${search}` : "?search=";
            goto(query);
        }
    };
</script>

<div class="container mx-auto mt-8">
    <!-- Buscador -->
    <div class="mb-4">
        <label for="search" class="text-sm font-medium text-gray-600">Buscar Empresas:</label>
        <input type="text" id="search" name="search" class="mt-1 p-2 w-full border rounded-md" bind:value={search} on:input on:keydown={handleKeydown}>
    </div>

    <!-- Tabla de Empresas -->
    <div class="bg-white shadow-md rounded-md overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b">Nombre</th>
                    <th class="py-2 px-4 border-b">Acciones</th>
                    <!-- Otros encabezados de la tabla -->
                </tr>
            </thead>
            <tbody>
                <!-- Iterar sobre las empresas y mostrarlas aquí -->
                {#each companies as company}
                <tr>
                    <td class="py-2 px-4 border-b">{company.name}</td>
                    <td class="py-2 px-4 border-b">
                        <a href="/companies/{company.id}/edit" class="text-blue-500 hover:underline">Editar</a>
                    </td>
                    <!-- Otros detalles de la empresa -->
                </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <!-- Paginación -->
    <div class="mt-4 flex items-center justify-end">
        <nav>
            {#each Array(totalPages) as _, index}
                <a 
                    href="/companies?seaarch={search}&page={index + 1}"
                    class="{currentPage === index + 1 ? 'text-gray-800' : 'text-blue-600'}"
                >
                    {index + 1}
                </a>
            {/each}
        </nav>
    </div>
</div>

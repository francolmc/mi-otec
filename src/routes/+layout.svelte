<script>
    import "../app.css";
    import { page } from "$app/stores";
</script>

<nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <div class="text-white text-lg font-bold">Mi OTEC</div>
        <!-- Agrega aquí enlaces de navegación si es necesario -->
        {#if !$page.data.user}
        <a href="/auth/login">Login</a>
        {/if}
        {#if $page.data.user}
        <form action="/auth/logout" method="post">
            {$page.data.user.firstName} | <button type="submit">Logout</button>
        </form>
        {/if}
    </div>
</nav>

<slot />

<footer class="bg-gray-200 py-4 mt-8">
    <div class="container mx-auto text-center text-gray-600">
        <p>&copy; 2023 Tu Aplicación. Todos los derechos reservados.</p>
    </div>
</footer>

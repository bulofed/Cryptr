<template>
    <NuxtLink to="/">
        <IconLogo class="absolute top-8 left-8 size-12 fill-black cursor-pointer" />
    </NuxtLink>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-4xl px-64">
            <div class="space-y-5">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-900">Creez votre compte</h2>
                </div>
                <SocialBtn />
                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">OU</span>
                    </div>
                </div>
                <FormRegister />
            </div>
        </div>
    </div>
</template>
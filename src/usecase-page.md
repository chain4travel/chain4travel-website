---
layout: default
pagination:
    data: usecases.data
    size: 1
    alias: usecaseData
permalink: "/usecase/{{ usecaseData.attributes.PageName | slugify }}/"
eleventyComputed:
    title: "{{usecaseData.attributes.PageName}}"
heroText: heroText
heroHighlight: heroHighlight
heroSub: heroSub
---

{% set x = usecaseData.attributes %}

<!-- Hero starts -->
<div class="py-20 bg-gray-900 text-white">
    <div class="max-w-screen-md px-8 md:px-4 mx-auto text-center">
        <p class="text-secondary uppercase font-bold text-sm tracking-widest mb-6">Use Case in detail</p>
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-black">
            {{heroText}} <span class="text-primary">{{heroHighlight}}</span>
        </h1>
        <p class="mt-8 md:text-lg lg:text-xl max-w-screen-md mx-auto text-gray-400">
            {{heroSub}}
        </p>
    </div>
</div>
<!-- Hero ends -->

<div class="py-16 md:py-32">
    <div class="max-w-screen-xl px-8 md:px-4 mx-auto grid grid-cols-12 gap-6 items-center">
        <div class="col-span-12 md:col-span-6">
            <div class="text-2xl xl:text-5xl font-black">
                {{x.HeadlineH1}}
            </div>
            <p class="my-2 md:my-6">
                {{x.TextT1}}
            </p>
        </div>
        <div class="col-span-12 md:col-span-5 md:col-start-8 rounded-lg overflow-hidden h-64 md:h-[460px]">
            <img class="w-full h-full object-cover" src="https://media.istockphoto.com/id/1065191436/de/foto/touristen-entdecken-die-eish%C3%B6hle.jpg?s=1024x1024&w=is&k=20&c=B5vaKxP7VVmp2LJOC4Evh-blpazzQOnMMmHwqmdqA2w=" alt="Chain4Travel Logo">
        </div>
    </div>
</div>

<div class="pb-16 md:pb-32">
    <div class="max-w-screen-xl px-8 md:px-4 mx-auto">
    {% for y in testimonials %}
    {% if x.QuoteName == y.slug %}
    <div class="bg-gray-100 rounded-lg p-4 md:p-6 flex items-start">
        <img class="w-12 md:w-24 h-12 md:h-24 rounded-lg" src="/images/{{y.slug}}.png" alt="">
        <div class="ml-4 md:ml-8">
            <p class="md:text-3xl line-clamp-4 font-black">
                “{{y.text}}”
            </p>
            <div class="text-gray-700 text-sm md:text-base my-2 md:my-4">
                <div class="font-bold">{{y.person}}</div>
                {{y.company}}
            </div>
        </div>
    </div>
    {% endif %}
    {% endfor %}
</div>
</div>

<div class="prose prose-lg max-w-screen-xl px-8 md:px-4 mx-auto">
    {{ x.UseCaseText | safe }}
</div>
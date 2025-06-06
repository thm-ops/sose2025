"use client";

import Header from "@/app/Header.component";
import Link from "next/link";
import Image from "next/image";

/**
 * @component Hero
 * @description The Hero component serves as the landing section of the application.
 */
function Hero() {
    return (
        <div className="bg-gray-900">
            <Header dark absolute />
            <div className="relative isolate overflow-hidden pt-14 min-h-screen flex justify-center items-center">
                <HeroImage />
                <HeroDecorationTop />
                <HeroContent />
                <HeroDecorationBottom />
            </div>
        </div>
    );
}

/**
 * @component HeroDecorationTop
 * @description A decorative element positioned at the top of the hero section.
 */
function HeroDecorationTop() {
    return (
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
                style={{
                    clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
        </div>
    );
}

/**
 * @component HeroDecorationBottom
 * @description A decorative element positioned at the bottom of the hero section.
 */
function HeroDecorationBottom() {
    return (
        <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div
                style={{
                    clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
        </div>
    );
}

/**
 * @component HeroContent
 * @description The main content of the hero section.
 */
function HeroContent() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Rubber Ducking</h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                        Entdecken Sie die Welt der Gummienten mit unserem einzigartigen Shop. Von klassischen Designs bis hin zu kreativen
                        Sammlerstücken - hier finden Sie alles, was das Herz begehrt.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="#productsList"
                            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                            Produkte ansehen
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * @component HeroImage
 * @description A background image for the hero section.
 */
function HeroImage() {
    return (
        <Image
            alt=""
            width={2830}
            height={1857}
            src="https://images.unsplash.com/photo-1710306973761-717ec384efd3?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 -z-10 size-full object-cover filter brightness-25"
        />
    );
}

export default Hero;
export { HeroDecorationTop, HeroDecorationBottom, HeroContent, HeroImage };

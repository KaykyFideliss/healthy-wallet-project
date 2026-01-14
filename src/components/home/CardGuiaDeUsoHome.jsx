import React from 'react'
import {Card, CardHeader, CardFooter, Image, Button} from "@heroui/react"

const CardGuiaDeUsoHome = () => {
  return (
    <section className='items-center justify-center flex w-full h-screen'>
        
    <div className="max-w-[1200px] mx-auto gap-4 grid grid-cols-12 px-4 sm:px-6">
  <Card className="col-span-12 sm:col-span-4 h-[300px] ">
    <CardHeader className="absolute z-10 top-2 flex-col items-start">
      <p className="text-tiny text-white/60 uppercase font-bold">
        What to watch
      </p>
      <h4 className="text-orange-500 font-medium text-large">
        Stream the Acme event
      </h4>
    </CardHeader>
    <Image
      removeWrapper
      alt="Card background"
      className="z-0 w-full h-full object-cover"
      src="https://heroui.com/images/card-example-4.jpeg"
    />
  </Card>

  <Card className="col-span-12 sm:col-span-4 h-[300px]">
    <CardHeader className="absolute z-10 top-2 flex-col items-start">
      <p className="text-tiny text-white/60 uppercase font-bold">
        Plant a tree
      </p>
      <h4 className="text-white font-medium text-large">
        Contribute to the planet
      </h4>
    </CardHeader>
    <Image
      removeWrapper
      alt="Card background"
      className="z-0 w-full h-full object-cover"
      src="https://heroui.com/images/card-example-3.jpeg"
    />
  </Card>

  <Card className="col-span-12 sm:col-span-4 h-[300px]">
    <CardHeader className="absolute z-10 top-2 flex-col items-start">
      <p className="text-tiny text-white/60 uppercase font-bold">
        Supercharged
      </p>
      <h4 className="text-white font-medium text-large">
        Creates beauty like a beast
      </h4>
    </CardHeader>
    <Image
      removeWrapper
      alt="Card background"
      className="z-0 w-full h-full object-cover"
      src="https://heroui.com/images/card-example-2.jpeg"
    />
  </Card>

  <Card isFooterBlurred className="col-span-12 sm:col-span-5 h-[300px]">
    <CardHeader className="absolute z-10 top-2 flex-col items-start">
      <p className="text-tiny text-white/60 uppercase font-bold">New</p>
      <h4 className="text-black font-medium text-2xl">
        Acme camera
      </h4>
    </CardHeader>
    <Image
      removeWrapper
      alt="Card example background"
      className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
      src="https://heroui.com/images/card-example-6.jpeg"
    />
    <CardFooter className="absolute bottom-0 z-10 bg-white/30 border-t border-white/20 justify-between">
      <div>
        <p className="text-black text-tiny">Available soon.</p>
        <p className="text-black text-tiny">Get notified.</p>
      </div>
      <Button size="sm" radius="full" color="primary">
        Notify Me
      </Button>
    </CardFooter>
  </Card>

  <Card isFooterBlurred className="col-span-12 sm:col-span-7 h-[300px]">
    <CardHeader className="absolute z-10 top-2 flex-col items-start">
      <p className="text-tiny text-white/60 uppercase font-bold">
        Your day your way
      </p>
      <h4 className="text-white/90 font-medium text-xl">
        Your checklist for better sleep
      </h4>
    </CardHeader>
    <Image
      removeWrapper
      alt="Relaxing app background"
      className="z-0 w-full h-full object-cover"
      src="https://heroui.com/images/card-example-5.jpeg"
    />
    <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t border-white/10 flex items-center gap-3">
      <Image
        alt="Breathing app icon"
        className="rounded-full w-10 h-10"
        src="https://heroui.com/images/breathing-app-icon.jpeg"
      />
      <div className="flex flex-col text-white text-tiny">
        <span>Breathing App</span>
        <span>Get a good night’s sleep.</span>
      </div>
      <Button size="sm" radius="full" className="ml-auto">
        Get App
      </Button>
    </CardFooter>
  </Card>
</div>

    </section>
  )
}

export default CardGuiaDeUsoHome


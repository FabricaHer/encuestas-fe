'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Table from "./table";



export default function TabsConfig() {


  return (<>
  <Tabs defaultValue="areas"  >
  <TabsList className="w-full">
    <TabsTrigger value="areas" >Areas</TabsTrigger>
    <TabsTrigger value="users">Usuarios (proximamente)</TabsTrigger>
  </TabsList>
  <TabsContent value="areas"><Table/></TabsContent>
  <TabsContent value="users">Change your user here.</TabsContent>
</Tabs>
  </>)
}
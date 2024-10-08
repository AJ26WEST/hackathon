import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowRight, BarChart2, Leaf, Zap } from 'lucide-react'

const climateData = [
  { year: '2015', temperature: 0.5 },
  { year: '2016', temperature: 0.6 },
  { year: '2017', temperature: 0.7 },
  { year: '2018', temperature: 0.8 },
  { year: '2019', temperature: 1.0 },
  { year: '2020', temperature: 1.1 },
  { year: '2021', temperature: 1.2 },
]

export default function ClimateInsightsPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [predictionResult, setPredictionResult] = useState('')
  const [footprintResult, setFootprintResult] = useState('')

  const handlePrediction = (e: React.FormEvent) => {
    e.preventDefault()
    const co2 = (e.target as HTMLFormElement).co2.value
    const deforestation = (e.target as HTMLFormElement).deforestation.value
    setPredictionResult(`Predicted climate impact based on ${co2} ppm CO₂ and ${deforestation} hectares/year deforestation.`)
  }

  const handleFootprint = (e: React.FormEvent) => {
    e.preventDefault()
    const transport = parseFloat((e.target as HTMLFormElement).transport.value)
    const energy = parseFloat((e.target as HTMLFormElement).energy.value)
    const diet = parseFloat((e.target as HTMLFormElement).diet.value)
    const totalFootprint = transport + energy + diet
    setFootprintResult(`Your total carbon footprint is ${totalFootprint.toFixed(2)} kg CO₂/year.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Climate Insights Platform</h1>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-green-200">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="prediction">Prediction</TabsTrigger>
          <TabsTrigger value="footprint">Footprint Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Global Climate Data</CardTitle>
              <CardDescription>Temperature anomaly over the years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={climateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prediction">
          <Card>
            <CardHeader>
              <CardTitle>Climate Prediction</CardTitle>
              <CardDescription>Predict climate impact based on CO₂ emissions and deforestation rate</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePrediction} className="space-y-4">
                <div>
                  <label htmlFor="co2" className="block text-sm font-medium text-gray-700">CO₂ Emissions (ppm)</label>
                  <Input type="number" id="co2" name="co2" required />
                </div>
                <div>
                  <label htmlFor="deforestation" className="block text-sm font-medium text-gray-700">Deforestation Rate (hectares/year)</label>
                  <Input type="number" id="deforestation" name="deforestation" required />
                </div>
                <Button type="submit">Predict Climate Impact</Button>
              </form>
              {predictionResult && (
                <div className="mt-4 p-4 bg-blue-100 rounded-md">
                  <p className="text-blue-800">{predictionResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footprint">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint Tracker</CardTitle>
              <CardDescription>Calculate your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFootprint} className="space-y-4">
                <div>
                  <label htmlFor="transport" className="block text-sm font-medium text-gray-700">Transport (kg CO₂/year)</label>
                  <Input type="number" id="transport" name="transport" required />
                </div>
                <div>
                  <label htmlFor="energy" className="block text-sm font-medium text-gray-700">Energy Use (kg CO₂/year)</label>
                  <Input type="number" id="energy" name="energy" required />
                </div>
                <div>
                  <label htmlFor="diet" className="block text-sm font-medium text-gray-700">Diet (kg CO₂/year)</label>
                  <Input type="number" id="diet" name="diet" required />
                </div>
                <Button type="submit">Calculate Footprint</Button>
              </form>
              {footprintResult && (
                <div className="mt-4 p-4 bg-green-100 rounded-md">
                  <p className="text-green-800">{footprintResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="mt-8 text-center text-gray-600">
        <p>&copy; 2023 Climate Insights Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

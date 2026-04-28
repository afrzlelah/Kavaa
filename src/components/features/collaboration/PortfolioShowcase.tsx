import { Card, CardHeader } from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/Button";

export function PortfolioShowcase() {
  return (
    <Card>
      <CardHeader 
        title="Draf Showcase Portofolio Tim" 
        subtitle="Portfolio Showcase Preview" 
      />
      <div className="bg-slate-100 rounded-xl w-full h-24 mb-4 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&q=80" 
          alt="Portfolio preview" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <Button className="w-full">
        Feedback Tim Mendalam
      </Button>
    </Card>
  );
}

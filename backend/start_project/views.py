from django.http import HttpResponseNotFound

def home(request):
    return HttpResponseNotFound("<h2>Welcome to Holiday Planner Web Application</h2><br></h5>Go to /admin to access admin panel</h5>")


def not_found_view(request):
    return HttpResponseNotFound("<h2>Page Not Found</h2>")